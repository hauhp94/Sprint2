import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderDetail} from "../../../model/order-detail/order-detail";
import {UntilService} from "../../../service/order/until.service";

class AcountServcies {
}

//huynh code
@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-detail-list.component.html',
  styleUrls: ['./order-detail-list.component.css']
})
export class OrderDetailListComponent implements OnInit {
  listOderDetail: OrderDetail[]

  constructor(public dialogRef: MatDialogRef<OrderDetailListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private untilServices: UntilService
  ) {
  }

  ngOnInit(): void {
    this.listOderDetail = this.data.oderDetailList;
    console.log(this.listOderDetail)
  }

  close(): void {
    this.dialogRef.close();
  }

  disPlayMoneyTotal(orderDetail: OrderDetail) {
    let num =orderDetail.services.prices*orderDetail.quantity
    return this.untilServices.numberWithCommas(num)
  }

  disPlayMoney(num:number) {
    return this.untilServices.numberWithCommas(num)
  }


}
