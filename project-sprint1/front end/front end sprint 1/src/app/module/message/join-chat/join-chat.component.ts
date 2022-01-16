import {Component, DoCheck, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {AccountService} from '../../../service/account/account.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {TokenStorageService} from '../../../service/account/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {snapshotToArray} from '../room-list/room-list.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-join-chat',
  templateUrl: './join-chat.component.html',
  styleUrls: ['./join-chat.component.css']
})
export class JoinChatComponent implements OnInit, DoCheck {
  nickname = '';
  refRooms = this.storage.database.ref('rooms/');
  refUsers = this.storage.database.ref('users/');
  matcher = new MyErrorStateMatcher();
  role: string;
  isAdminRead: boolean;
  chatNoti = '';
  roomname = '';
  newNickname = '';
  roomHaveNewMess: any;

  constructor(private router: Router, public datepipe: DatePipe,
              private accountService: AccountService,
              @Inject(AngularFireDatabase) private storage: AngularFireDatabase,
              private tokenStorage: TokenStorageService,
              private toast: ToastrService
  ) {
  }

  ngDoCheck(): void {
    this.checkNewMess();
    this.ngOnInit();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getUser() != null) {
      this.role = this.tokenStorage.getUser().roles;
      if (this.role[0] !== 'ROLE_ADMIN') {
        this.nickname = this.tokenStorage.getUser().username;
      } else {
        this.nickname = 'Admin';
      }
      localStorage.setItem('nickname', this.nickname);
    }
    this.checkNewMess();
  }

  checkNewMess() {
    this.storage.database.ref('newMess/').orderByChild('status').equalTo('true').on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      this.newNickname = this.nickname;
      if (roomuser.length !== 0) {
        this.isAdminRead = true;
        this.roomHaveNewMess = roomuser.length;
      } else {
        this.isAdminRead = false;
      }
    });
  }

  enterChatRoom(roomname
                  :
                  string
  ) {
    localStorage.setItem('nickname', this.nickname);
    this.addUser(this.nickname);
    // if (this.nickname !== 'Admin') {
    //   this.setOnline(roomname);
    // }
    if (this.nickname !== 'Admin') {
      this.addRoom(roomname);
      this.router.navigate(['/chatRoom', roomname]);
    } else {
      this.router.navigate(['/roomList']);
    }
  }

  addRoom(roomName
            :
            any
  ) {
    const room = {roomname: ''};
    room.roomname = roomName;
    this.refRooms.orderByChild('roomname').equalTo(room.roomname).once('value', (snapshot: any) => {
      if (!snapshot.exists()) {
        const newRoom = this.storage.database.ref('rooms/').push();
        newRoom.set(room);
      }
    });
  }

  addUser(nickname
            :
            any
  ) {
    const user = {nickname: nickname};
    this.refUsers.orderByChild('nickname').equalTo(user.nickname).once('value', snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem('nickname', user.nickname);
      } else {
        const newUser = this.storage.database.ref('users/').push();
        newUser.set(user);
        localStorage.setItem('nickname', user.nickname);
      }
    });
  }

  findUser() {
    const user = this.tokenStorage.getUser();
    if (user == null) {
      this.toast.error('Please login first or connect Admin', 'Error');
    } else {
      this.role = this.tokenStorage.getUser().roles;
      // tslint:disable-next-line:triple-equals
      if (this.role == 'ROLE_ADMIN') {
        this.nickname = 'Admin';
      } else {
        this.nickname = this.tokenStorage.getUser().username;
      }
      const roomname = this.nickname + '-room';
      this.roomname = roomname;
      this.enterChatRoom(roomname);
    }
  }

}

