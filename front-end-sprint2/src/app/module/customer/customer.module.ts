import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CustomerRoutingModule} from './customer-routing.module';
import {ToastrModule} from 'ngx-toastr';



@NgModule({
  declarations: [CreateCustomerComponent, ListCustomerComponent, EditCustomerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
