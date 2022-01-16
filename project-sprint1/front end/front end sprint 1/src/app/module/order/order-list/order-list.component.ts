import {Component, OnInit} from '@angular/core';
import {Order} from "../../../model/order-detail/order";
import {OrderService} from "../../../service/order/order.service";
import {OrderDetailService} from "../../../service/order-detail/order-detail.service";
import {OrderDetail} from "../../../model/order-detail/order-detail";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailListComponent} from "../order-detail-list/order-detail-list.component";
import {OrderPaymentComponent} from "../order-payment/order-payment.component";
import {UntilService} from "../../../service/order/until.service";

// huynh code
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public p = 0;
  orderPage= [];
  ps: Array<any> = [];
  message="";
  mapTotalMoney = new Map();
  orderDetailList: OrderDetail[];

  constructor(private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              public dialog: MatDialog,
              private untilServices: UntilService
  ) {

  }

  ngOnInit(): void {
    this.getAllOrderPage();
  }

  getTotalMoney(idOrder: number) {
    let totalMoney = 0;
    this.orderDetailService.getAllOderDetailByIdOder(idOrder).subscribe(value => {
      this.orderDetailList = value;
      for (let orderDetail of this.orderDetailList) {
       totalMoney += (orderDetail.services.prices*orderDetail.quantity);
      }
      this.mapTotalMoney.set(idOrder,this.disPlayMoney(totalMoney));
    })
  }

  getAllOrderPage() {
    this.orderService.getAllOder(this.p).subscribe(value => {
      if (value == null) {
        this.orderPage = [];
        this.message = 'List is empty';
      } else {
        this.orderPage = value.content;
        for (let order of this.orderPage) {
          this.getTotalMoney(order.orderId)
        }
      }
      this.ps = new Array<any>(value.totalPages);
    }, error => {
      this.message = 'List is empty';
    });
  }

  first() {
    this.p = 0;
    this.getAllOrderPage()
  }

  last() {
    this.p = this.ps.length - 1;
    this.getAllOrderPage()
  }

  previous() {
    if (this.p === 0) {
      this.p = 1;
    }
    this.p = this.p - 1;
    this.getAllOrderPage();
  }

  next() {
    if (this.p > this.ps.length - 2) {
      this.p = this.ps.length - 1;
      this.getAllOrderPage();
    } else {
      this.p = this.p + 1;
      this.getAllOrderPage();
    }
  }

  openDialog(id: any) {
    this.orderDetailService.getAllOderDetailByIdOder(id).subscribe(data => {
      const dialogRef = this.dialog.open(OrderDetailListComponent, {
        data: {oderDetailList: data},
        width: '700px',
        height: 'auto',
        disableClose: true,

      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  openDialogConfirmPayment(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe(data => {
      const dialogRef = this.dialog.open(OrderPaymentComponent, {
        data: {order: data},
        width: '500px',
        height: 'auto',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  disPlayMoney(num: number) {
    return this.untilServices.numberWithCommas(num)
  }
}
