import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DatePipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {BrowserModule} from '@angular/platform-browser';
import {JoinChatComponent} from './join-chat/join-chat.component';
import {ChatRoomComponent} from './chat-room/chat-room.component';
import {RoomListComponent} from './room-list/room-list.component';
import {RouterModule} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [JoinChatComponent,
    ChatRoomComponent,
    RoomListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatButtonModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxPaginationModule,
  ],
  providers: [DatePipe],
  exports: [
    JoinChatComponent
  ]
})
export class MessageModule {
}
