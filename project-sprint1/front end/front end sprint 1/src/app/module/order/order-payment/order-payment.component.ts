import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../../service/order/order.service";
import {OrderDetailService} from "../../../service/order-detail/order-detail.service";
import {Router} from "@angular/router";
import {Order} from "../../../model/order-detail/order";
import {ToastrService} from "ngx-toastr";
import {UntilService} from "../../../service/order/until.service";
import {CategoryService} from "../../../service/category/category.service";
import {ServiceService} from "../../../service/service/service.service";

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
// huynh code
export class OrderPaymentComponent implements OnInit {
  orderId: number;
  nameCustomer: string;
  totalMoneys: any;
  orderDetailList = [];
  order: Order;
  category: any;
  totalMoneyHours: any;

  constructor(public dialogRef: MatDialogRef<OrderPaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public orderService: OrderService,
              public orderDetailService: OrderDetailService,
              public router: Router,
              private toast: ToastrService,
              private untilServices: UntilService,
              private categoryService: CategoryService,
              private servicesService: ServiceService) {
  }

  ngOnInit(): void {
    this.orderId = this.data.order.orderId;
    this.nameCustomer = this.data.order.customer.fullName;
    this.getTotalMoney(this.data.order.orderId);
    this.order = this.data.order;
  }

  close() {
    this.dialogRef.close();
    this.toast.error('payment failed order ' + this.nameCustomer);
  }

// huynh code
  confirm() {
    this.orderService.confirmPayment(this.orderId).subscribe(() => {
      this.category = this.order.customer.account.category
      console.log(this.category)
      if (this.totalMoneys != 0) {
        this.categoryService.addMoney(this.category, this.totalMoneyHours).subscribe()
      }
      this.updateQuantity();
      this.toast.success('order payment successfully ' + this.nameCustomer + ' with total money : ' + this.totalMoneys);
      this.dialogRef.close();
      this.router.navigateByUrl('/order/list')
    })
  }

  getTotalMoney(idOrder: number) {
    let totalMoney = 0;
    this.orderDetailService.getAllOderDetailByIdOder(idOrder).subscribe(value => {
      this.orderDetailList = value;
      for (let orderDetail of this.orderDetailList) {
        totalMoney += orderDetail.services.prices * orderDetail.quantity;
        if (orderDetail.services.name == "Giờ") {
          this.totalMoneyHours = orderDetail.quantity * orderDetail.services.prices
        }
      }
      this.totalMoneys = this.disPlayMoney(totalMoney)
    })
  }

  disPlayMoney(num: number) {
    return this.untilServices.numberWithCommas(num)
  }


  updateQuantity() {
    for (let orderDetail of this.orderDetailList) {
      this.servicesService.updateQuantity(orderDetail.services.servicesId, orderDetail.quantity).subscribe(value => {
      })
    }
  }
}
