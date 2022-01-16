import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {AngularFireDatabase} from '@angular/fire/database';
import {TokenStorageService} from '../../../service/account/token-storage.service';


export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  nickname = '';
  rooms = [];
  isLoadingResults = true;
  page = 1;
  roomsNewMess = [];
  haveNewMess = false;
  role: any;

  constructor(private route: ActivatedRoute, private router: Router,
              public datepipe: DatePipe,
              @Inject(AngularFireDatabase) private storage: AngularFireDatabase,
              private tokenStorage: TokenStorageService) {
    this.nickname = localStorage.getItem('nickname');
    this.storage.database.ref('rooms/').on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.isLoadingResults = false;
    });
  }

  ngOnInit(): void {
    this.checkRoomNewMess();
    this.role = this.tokenStorage.getUser().roles;
    if (this.role[0] !== 'ROLE_ADMIN') {
      this.nickname = this.tokenStorage.getUser().username;
    } else {
      this.nickname = 'Admin';
    }
    localStorage.setItem('nickname', this.nickname);
  }

  enterChatRoom(roomname: string) {
    // const chat = {roomname: '', nickname: '', message: '', date: '', type: ''};
    // chat.roomname = roomname;
    // chat.nickname = this.nickname;
    // chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    // chat.message = `${this.nickname} enter the room`;
    // chat.type = 'join';
    // const newMessage = this.storage.database.ref('chats/').push();
    // newMessage.set(chat);

    // this.setOnline(roomname);

    this.router.navigate(['/chatRoom', roomname]);
  }

  backToHomePage() {
    this.router.navigate(['/']);
  }

  setOnline(roomname: any) {
    this.storage.database.ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (abc: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(abc);
      console.log(roomuser);
      const user = roomuser.find(x => x.nickname === this.nickname);
      console.log(user);
      if (user !== undefined) {
        const userRef = this.storage.database.ref('roomusers/' + user.key);
        userRef.update({status: 'abc'});
      } else {
        const newroomuser = {roomname: '', nickname: '', status: ''};
        newroomuser.roomname = roomname;
        newroomuser.nickname = this.nickname;
        newroomuser.status = 'online';
        const newRoomUser = this.storage.database.ref('roomusers/').push();
        newRoomUser.set(newroomuser);
      }
    });
  }

  checkRoomNewMess() {
    this.storage.database.ref('newMess/').orderByChild('status').equalTo('true').on('value', (resp: any) => {
      this.roomsNewMess = snapshotToArray(resp);
    });
  }
}
