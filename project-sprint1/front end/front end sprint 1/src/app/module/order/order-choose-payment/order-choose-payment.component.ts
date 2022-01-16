import {Component, Inject, OnInit} from '@angular/core';
import {OrderDetail} from "../../../model/order-detail/order-detail";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PaymentService} from "../../../service/paypal/payment.service";
import {OrderDetailService} from "../../../service/order-detail/order-detail.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-order-choose-payment',
  templateUrl: './order-choose-payment.component.html',
  styleUrls: ['./order-choose-payment.component.css']
})
// huynh code
export class OrderChoosePaymentComponent implements OnInit {
  totalMoneys: number;
  orderDetailList: any;
  orderId: number;

  constructor(public dialogRef: MatDialogRef<OrderChoosePaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public paymentService: PaymentService,
              public orderDetailService: OrderDetailService,
              public router: Router,
              private toast: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getTotalMoney(this.data.order.orderId);
    this.orderId = this.data.order.orderId
  }

  getTotalMoney(idOrder: number) {
    let totalMoney = 0;
    this.orderDetailService.getAllOderDetailByIdOder(idOrder).subscribe(value => {
      this.orderDetailList = value;
      for (let orderDetail of this.orderDetailList) {
        totalMoney += (orderDetail.services.prices * orderDetail.quantity);
      }
      this.totalMoneys = +(totalMoney / 23000).toFixed(2)
    })
  }

  payment() {
    this.dialogRef.close();
  }

  payPal(totalMoney: number) {
    localStorage.setItem("orderId", String(this.orderId));
    this.paymentService.payment(totalMoney).subscribe(value => {
      console.log(value)
      // window.open(value.link)
      // @ts-ignore
      window.location.href = value.link;
    })
  }


}
