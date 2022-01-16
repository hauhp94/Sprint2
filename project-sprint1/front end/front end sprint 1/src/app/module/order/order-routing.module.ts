import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderListCustomerComponent} from "./order-list-customer/order-list-customer.component";
import {ConfirmPaypalComponent} from "./confirm-paypal/confirm-paypal.component";
import {AuthUserGuard} from "../account/auth-user.guard";
import {AuthGuard} from "../account/auth.guard";
import {AuthModGuard} from "../account/auth-mod.guard";

// huynh code
const routes: Routes = [
  {path: 'list', component: OrderListComponent,canActivate: [AuthModGuard]},
  {path: 'list-order-customer', component: OrderListCustomerComponent,canActivate: [AuthUserGuard]},
  {path: 'payment-cancel', component: OrderListCustomerComponent},
  {path: 'payment-success', component: ConfirmPaypalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
