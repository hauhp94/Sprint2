import {Component, OnInit} from '@angular/core';
import {Order} from "../../../model/order-detail/order";
import {OrderDetail} from "../../../model/order-detail/order-detail";
import {OrderService} from "../../../service/order/order.service";
import {OrderDetailService} from "../../../service/order-detail/order-detail.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailListComponent} from "../order-detail-list/order-detail-list.component";
import {OrderChoosePaymentComponent} from "../order-choose-payment/order-choose-payment.component";
import {UntilService} from "../../../service/order/until.service";
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../../service/category/category.service";


@Component({
  selector: 'app-order-list-customer',
  templateUrl: './order-list-customer.component.html',
  styleUrls: ['./order-list-customer.component.css']
})
// huynh code
export class OrderListCustomerComponent implements OnInit {
  public p = 0;
  orderPage: Order[] = [];
  po: Array<any> = [];
  idCustomer: number;
  mapTotalMoney = new Map();
  orderDetailList: OrderDetail[]
  message: string;
  countDowTime: string
  category1: any


  constructor(private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              public dialog: MatDialog,
              private untilServices: UntilService,
              private toast: ToastrService,
              private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService,
  ) {
    this.idCustomer = this.tokenStorageService.getUser().customer.customerId
  }


  ngOnInit() {
    this.getAllOrderPage(this.idCustomer);
    this.getCategory()

  }

  getCategory() {
    this.categoryService.findById(this.tokenStorageService.getUser().category).subscribe(data => {
      this.category1 = data;
      let timeJv = this.category1.endTime
      let timeJs = this.convertTime(timeJv)
      setInterval(() => {
        this.countDow(timeJs)
      }, 1000);
      this.first();

    })
  }

  convertTime(timeJV: string) {
    let year, month, day, hours, minute, second
    for (let i = 0; i < timeJV.length; i++) {
      hours = timeJV[0] + timeJV[1];
      minute = timeJV[3] + timeJV[4];
      second = timeJV[6] + timeJV[7];
      day = timeJV[9] + timeJV[10];
      month = this.isMonth(timeJV[12] + timeJV[13]);
      year = timeJV[15] + timeJV[16] + timeJV[17] + timeJV[18];
    }
    let str = month + day + "," + year + "," + hours + ":" + minute + ":" + second
    return new Date(str).getTime()

  }

  isMonth(str:string){
    switch (str) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
    }
  }


  private countDow(timeEnd: any) {
    let fut = timeEnd
    let now = new Date().getTime()
    if (fut - now > 0) {
      let D = fut - now;
      if (D < 1000 * 60 * 10 && D > (1000 * 60 * 10 - 1000)) {
        this.toast.error("You have 10 minutes ,please top up")
      }
      if (D < 1000 * 60 * 5 && D > (1000 * 5 * 10 - 1000)) {
        this.toast.error("You have 5 minutes ,please top up")
      }
      let seconds = Math.floor(D / 1000)
      let minutes = Math.floor(D / 1000 / 60)
      let hours = Math.floor(D / 1000 / 60 / 60)
      let days = Math.floor(D / 1000 / 60 / 60 / 24)
      hours %= 24
      minutes %= 60
      seconds %= 60
      this.countDowTime = days + 'd :' + hours + 'h :' + minutes + 'm :' + seconds + 's'
    } else {
      this.countDowTime = 0 + 'd :' + 0 + 'h :' + 0 + 'm :' + 0 + 's'
    }
  }


  getTotalMoney(idOrder: number) {
    this.orderDetailService.getAllOderDetailByIdOder(idOrder).subscribe(value => {
      let totalMoney = 0;
      this.orderDetailList = value;
      for (let orderDetail of this.orderDetailList) {
        totalMoney += (orderDetail.services.prices * orderDetail.quantity);
      }
      this.mapTotalMoney.set(idOrder, this.untilServices.numberWithCommas(totalMoney));
    })
  }

  getAllOrderPage(idCustomer: number) {
    this.orderService.getAllOderByIdCustomer(idCustomer, this.p).subscribe(value => {

      if (value == null) {
        this.orderPage = [];
        this.message = "You don't have any services yet"
      } else {
        this.orderPage = value.content;
        this.po = new Array<any>(value.totalPages);
        for (let order of this.orderPage) {
          this.getTotalMoney(order.orderId)
        }
      }

    }, error => {

    });
  }

  first() {
    this.p = 0;
    this.getAllOrderPage(this.idCustomer)
  }

  last() {
    this.p = this.po.length - 1;
    this.getAllOrderPage(this.idCustomer)
  }

  previous() {
    if (this.p === 0) {
      this.p = 1;
    }
    this.p = this.p - 1;
    this.getAllOrderPage(this.idCustomer);
  }

  next() {
    if (this.p > this.po.length - 2) {
      this.p = this.po.length - 1;
      this.getAllOrderPage(this.idCustomer);
    } else {
      this.p = this.p + 1;
      this.getAllOrderPage(this.idCustomer);
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

  openDialogChoosePayment(orderId: number) {

    this.orderService.getOrderById(orderId).subscribe(data => {
      const dialogRef = this.dialog.open(OrderChoosePaymentComponent, {
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

}
