import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesCreateComponent } from './services-create/services-create.component';
import { ServicesEditComponent } from './services-edit/services-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ServiceRoutingModule} from './service-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { DeleteServicesComponent } from './delete-services/delete-services.component';
import { ServicesListComponent } from './services-list/services-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DrectiveServiceDirective } from './drective-service.directive';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    ServicesCreateComponent,
    ServicesEditComponent,
    DeleteServicesComponent,
    ServicesListComponent,
    DrectiveServiceDirective],
  exports: [
    ServicesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ServiceRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
  ]
})
export class ServiceModule { }
