import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderDetailRoutingModule} from './order-detail-routing.module';



@NgModule({
  declarations: [OrderDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OrderDetailRoutingModule,
  ]
})
export class OrderDetailModule { }
