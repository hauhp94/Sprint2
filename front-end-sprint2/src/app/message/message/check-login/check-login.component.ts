import {Component, DoCheck, OnInit} from '@angular/core';
import {ChatService} from '../../../service/chat/chat.service';
import {DataService} from '../../../service/chat/data.service';
import {EmployeeService} from '../../../service/employee/employee.service';
import {TokenStorageService} from '../../../service/security/token-storage.service';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.css']
})
export class CheckLoginComponent implements OnInit{

  constructor(private tokenStorageService: TokenStorageService,
              private chatService: ChatService,
              private employeeService: EmployeeService,
              private data: DataService) {
  }

  isLoggedIn = false;
  public messageText: string;
  public messageArray: { user: string, message: string, time: string, note: string }[] = [];
  private storageArray = [];
  public showScreen = false;
  public username: string;
  public currentUser;
  public selectedUser;
  public roomIdtest: any;
  public userDB;
  public userList;
  public newMessage = '';
  public note2 = 'send';
  public note5 = false;
  public nguoiGui = '';

 public message = 'default message';
  auto = false;

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.username = this.tokenStorageService.getUser().username;
      const userToken = this.tokenStorageService.getUser();
      this.employeeService.getAllUser().subscribe(data => {
        this.userDB = data;
        console.log(this.userDB)
        this.currentUser = this.userDB.find(user => user.account.username === userToken.username);
        this.userList = this.userDB.filter((user) => user.account.username !== userToken.username);
        if (this.currentUser) {
          this.showScreen = true;
          for (const item of this.userList) {
            this.selectUserHandler(item.account.username);
          }
        }
      });
    }
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  selectUserHandler(name: string): void {
    if (name === this.nguoiGui){
      this.nguoiGui = '';
    }
    this.selectedUser = this.userList.find(user => user.account.username === name);
    console.log(this.currentUser.account.username);
    if (this.currentUser.employeeId < this.selectedUser.employeeId){
      this.roomIdtest = this.currentUser.account.username + '+' + this.selectedUser.account.username;
    } else {
      this.roomIdtest = this.selectedUser.account.username + '+' + this.currentUser.account.username;
    }
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomIdtest);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }
    this.join(this.currentUser.account.username, this.roomIdtest);
    console.log(this.currentUser.account.username);
    console.log(this.roomIdtest);
  }

  join(username: string, roomId: number): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  viewMessages() {
    this.createMessage('default message');
    this.auto = true;
  }

  createMessage(message) {
    this.data.changeMessage(message);
  }

  receiveMessages() {
    this.message = '';
  }
}
