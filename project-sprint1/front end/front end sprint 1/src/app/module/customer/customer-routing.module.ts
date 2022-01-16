import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CustomerSignUpComponent} from './customer-sign-up/customer-sign-up.component';
import {AuthGuard} from "../account/auth.guard";
import {ListCustomerComponent} from "./list-customer/list-customer.component";
import {CreateCustomerComponent} from "./create-customer/create-customer.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {AuthModGuard} from "../account/auth-mod.guard";
import {ShowinfoCustomerComponent} from "./showinfo-customer/showinfo-customer.component";
import {AuthUserGuard} from "../account/auth-user.guard";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  {
    path: 'signUp', component: CustomerSignUpComponent
  },
  {
    path: 'list', component: ListCustomerComponent,canActivate: [AuthModGuard]
  },
  {
    path: 'create', component: CreateCustomerComponent,canActivate: [AuthModGuard]
  },
  {
    path: 'edit/:id', component: EditCustomerComponent,canActivate: [AuthModGuard]
  },
  {
    path: 'show-info', component: ShowinfoCustomerComponent,canActivate: [AuthUserGuard]
  },
  {
    path: 'change-password', component: ChangePasswordComponent,canActivate: [AuthUserGuard]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
