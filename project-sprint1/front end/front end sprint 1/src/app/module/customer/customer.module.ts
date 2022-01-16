import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerSignUpComponent} from './customer-sign-up/customer-sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from "@angular/platform-browser";
import {CustomerRoutingModule} from "./customer-routing.module";
import {RouterModule} from "@angular/router";
import {ToastrModule} from "ngx-toastr";
import {MatSelectModule} from "@angular/material/select";
import {ListCustomerComponent} from "./list-customer/list-customer.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {CreateCustomerComponent} from "./create-customer/create-customer.component";
import {ShowinfoCustomerComponent} from "./showinfo-customer/showinfo-customer.component";
import {HttpClientModule} from "@angular/common/http";
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [CustomerSignUpComponent,CreateCustomerComponent, EditCustomerComponent,ListCustomerComponent,ShowinfoCustomerComponent, ChangePasswordComponent],
  exports: [
    CustomerSignUpComponent,
    CreateCustomerComponent,EditCustomerComponent,ListCustomerComponent,ShowinfoCustomerComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CustomerRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatSelectModule
  ]
})
export class CustomerModule { }
