import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListCustomerComponent} from './list-customer/list-customer.component';
import {Router, RouterModule, Routes, ROUTES} from '@angular/router';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';
import {AuthGuard} from '../../security/auth.guard';


const routes: Routes = [
  {
    path: 'list', component: ListCustomerComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create', component: CreateCustomerComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id', component: EditCustomerComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
