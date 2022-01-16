import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderPaymentComponent} from './order-payment/order-payment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderChoosePaymentComponent} from './order-choose-payment/order-choose-payment.component';
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderDetailListComponent} from './order-detail-list/order-detail-list.component';
import {OrderListCustomerComponent} from "./order-list-customer/order-list-customer.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {OrderRoutingModule} from "./order-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ToastrModule} from "ngx-toastr";
import {ConfirmPaypalComponent} from './confirm-paypal/confirm-paypal.component';


// huynh code
@NgModule({
  declarations: [OrderPaymentComponent, OrderListComponent, OrderListCustomerComponent, OrderDetailListComponent, OrderChoosePaymentComponent, ConfirmPaypalComponent],
  exports: [
    OrderListComponent, OrderListCustomerComponent, OrderPaymentComponent
  ], imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    OrderRoutingModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    ToastrModule.forRoot()
  ]
})
export class OrderModule {
}
