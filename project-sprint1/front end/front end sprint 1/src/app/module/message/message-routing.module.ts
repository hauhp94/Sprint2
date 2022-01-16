import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {JoinChatComponent} from './join-chat/join-chat.component';
import {RoomListComponent} from './room-list/room-list.component';
import {ChatRoomComponent} from './chat-room/chat-room.component';
import {AuthGuard} from "../account/auth.guard";
import {AuthModGuard} from "../account/auth-mod.guard";
import {AuthUserGuard} from "../account/auth-user.guard";

const routes: Routes = [
  {path: 'joinChat', component: JoinChatComponent},
  {path: 'roomList', component: RoomListComponent,canActivate: [AuthGuard]},
  {path: 'chatRoom/:roomname', component: ChatRoomComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class MessageRoutingModule {
}
