import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomepageAndPawnRegistrationComponent} from './homepage-and-pawn-registration/homepage-and-pawn-registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotificationComponent} from './notification/notification.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ListPawnRegistrationComponent } from './list-pawn-registration/list-pawn-registration.component';

@NgModule({
  declarations: [HomepageAndPawnRegistrationComponent, NotificationComponent, ListPawnRegistrationComponent],
  exports: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule
  ]
})
export class PawnRegistrationModule {
}
