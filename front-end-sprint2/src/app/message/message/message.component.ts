import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked
} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChatService} from '../../service/chat/chat.service';
import {DataService} from '../../service/chat/data.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {EmployeeService} from '../../service/employee/employee.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewChecked{

  @ViewChild('popup', {static: false}) popup: any;
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
  public historyMessage = 'nhung';
  public newMessage = '';
  public i = 0;
  public note1 = 'take';
  public note2 = 'send';
  public note5 = false;
  public nguoiGui = '';
  public count = 0;


  constructor(
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal,
    private chatService: ChatService,
    private employeeService: EmployeeService,
    private data: DataService
  ) {
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  getAllUser() {
    this.employeeService.getAllUser().subscribe(data => {
      this.userDB = data;
      console.log(this.userDB);
    });
  }

  createMessage(message) {
    this.data.changeMessage(message);
  }

  ngOnInit(): void {
    this.scrollToBottom();
    this.getAllUser();
    this.employeeService.getAllUser().subscribe(data => {
      this.userDB = data;
      console.log(this.userDB);
      this.username = this.tokenStorageService.getUser().username;
      console.log(this.username);
      const userToken = this.tokenStorageService.getUser();
      this.currentUser = this.userDB.find(user => user.account.username === userToken.username);
      this.userList = this.userDB.filter((user) => user.account.username !== userToken.username);
      console.log(this.userList);
      if (this.currentUser) {
        this.showScreen = true;
        for (const item of this.userList) {
          this.selectUserHandler(item.account.username);
        }
      }
    });
    this.chatService.getMessage()
      .subscribe((data: { user: string, room: string, message: string }) => {
        this.nguoiGui = data.user;
        console.log(this.nguoiGui);
        setTimeout(() => {
          this.storageArray = this.chatService.getStorage();
          const storeIndex = this.storageArray
            .findIndex((storage) => storage.roomId === this.roomIdtest);
          console.log(this.roomIdtest);
          this.messageArray = this.storageArray[storeIndex].chats;
        }, 5);
        if (this.note1 === 'take' && this.note2 === 'send') {
          this.createMessage('receive');
          this.note2 = 'send';
        }
        if (this.note1 === 'take' && this.note2 === 'isMessage') {
          this.note2 = 'send';
          this.createMessage('default message');
        }
      });
  }

  selectUserHandler(name: string): void {
    if (name === this.nguoiGui) {
      this.nguoiGui = '';
    }
    this.selectedUser = this.userList.find(user => user.account.username === name);
    console.log(this.currentUser);
    console.log(this.selectedUser);
    if (this.currentUser.employeeId < this.selectedUser.employeeId) {
      this.roomIdtest = this.currentUser.account.username + '+' + this.selectedUser.account.username;
    } else {
      this.roomIdtest = this.selectedUser.account.username + '+' + this.currentUser.account.username;
    }
    this.messageArray = [];
    console.log(this.roomIdtest);
    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomIdtest);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }
    this.join(this.currentUser.account.username, this.roomIdtest);
  }

  join(username: string, roomId: number): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void {
    this.note2 = 'isMessage';
    const ngay = new Date();
    console.log(ngay);
    this.chatService.sendMessage({
      user: this.currentUser.account.username,
      room: this.roomIdtest,
      message: this.messageText,
      time: new Date(),
      note: this.historyMessage,
    });
    console.log(this.roomIdtest);
    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomIdtest);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.account.username,
        message: this.messageText,
        time: new Date(),
        note: this.historyMessage,
      });
    } else {
      const updateStorage = {
        roomId: this.roomIdtest,
        chats: [{
          user: this.currentUser.account.username,
          message: this.messageText,
          time: new Date(),
          note: this.newMessage,
        }]
      };
      this.storageArray.push(updateStorage);
    }
    console.log(this.roomIdtest);
    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }


}
