import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {snapshotToArray} from '../room-list/room-list.component';
import {AngularFireDatabase} from '@angular/fire/database';
import {TokenStorageService} from "../../../service/account/token-storage.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;
  chatForm: FormGroup;
  nickname = '';
  roomname = '';
  message = '';
  chats = [];
  matcher = new MyErrorStateMatcher();
  isAdminRead = false;
  isOnline = 'Online';
  status = '';
  isAdminOnline: boolean;
  newMessStatus = 'false';
  role: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datepipe: DatePipe,
              @Inject(AngularFireDatabase) private storage: AngularFireDatabase,
              private tokenStorage: TokenStorageService) {

    this.nickname = localStorage.getItem('nickname');
    this.roomname = this.route.snapshot.params.roomname;
    this.setOnline(this.roomname);
    this.storage.database.ref('chats/').orderByChild('roomname').equalTo(this.roomname).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
      setTimeout(() => this.isAdminOnline = this.checkIsAdminOnline(), 2000);
    });
  }

  ngOnInit(): void {

    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
    this.role = this.tokenStorage.getUser().roles;
    if (this.role[0] !== 'ROLE_ADMIN') {
      this.nickname = this.tokenStorage.getUser().username;
    } else {
      this.nickname = 'Admin';
    }
    localStorage.setItem('nickname', this.nickname);
    this.checkAdminJoinRoom();
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = this.storage.database.ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
    console.log(this.nickname);
    this.isAdminOnline = this.checkIsAdminOnline();
    if (this.nickname !== 'Admin') {
      console.log(this.isAdminOnline);
      if (this.isAdminOnline) {
        this.newMessStatus = 'false';
      } else {
        this.newMessStatus = 'true';
      }
      this.haveNewMess();
    }
  }

  exitChat() {
    this.isOnline = 'Offline';
    this.setOnline(this.roomname);
    if (this.nickname === 'Admin') {
      this.router.navigate(['/roomList']);
    } else {
      this.router.navigate(['/guest-homepage/home']);
    }
  }

  setOnline(roomname: any) {
    this.storage.database.ref('roomusers/').orderByChild('roomname').equalTo(roomname).once('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);

      const user = roomuser.find(x => x.nickname === this.nickname);
      if (user !== undefined) {
        const userRef = this.storage.database.ref('roomusers/' + user.key);
        const updateStatus = {status: ''};
        updateStatus.status = this.isOnline;
        userRef.update(updateStatus);
      } else {
        const newroomuser = {roomname: '', nickname: '', status: ''};
        newroomuser.roomname = roomname;
        newroomuser.nickname = this.nickname;
        newroomuser.status = this.isOnline;
        const newRoomUser = this.storage.database.ref('roomusers/').push();
        newRoomUser.set(newroomuser);
      }
    });

  }

  checkIsAdminOnline(): boolean {
    this.storage.database.ref('roomusers/').orderByChild('roomname').equalTo(this.roomname)
      .on('value', (resp: any) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find(x => x.nickname === 'Admin');
        console.log(user);
        // check = user.status === 'Online';
        this.status = user.status;
      });
    return this.status === 'Online';
  }

  haveNewMess() {
    this.storage.database.ref('newMess/').orderByChild('roomname').equalTo(this.roomname).once('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const roomStatus = roomuser.find(x => x.roomname === this.roomname);
      if (roomStatus !== undefined) {
        const roomStatusRef = this.storage.database.ref('newMess/' + roomStatus.key);
        const updateStatus = {status: ''};
        updateStatus.status = this.newMessStatus;
        roomStatusRef.update(updateStatus);
      } else {
        const newMess = {roomname: '', status: ''};
        newMess.roomname = this.roomname;
        newMess.status = this.newMessStatus;
        const newRoomRoom = this.storage.database.ref('newMess/').push();
        newRoomRoom.set(newMess);
      }
    });
  }

  checkAdminJoinRoom() {
    if (this.nickname === 'Admin') {
      this.newMessStatus = 'false';
      this.haveNewMess();
    }
  }
}

