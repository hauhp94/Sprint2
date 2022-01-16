import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderDetailService} from '../../../service/order-detail/order-detail.service';
import {OrderService} from '../../../service/order/order.service';
import {ServiceService} from '../../../service/service/service.service';
import {ToastrService} from 'ngx-toastr';

import {AccountService} from "../../../service/account/account.service";
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {OrderDetail} from "../../../model/order-detail/order-detail";
import {CustomerService} from "../../../service/customer/customer.service";
import {OrderDto} from "../../../model/order-detail/order-dto/order-dto";



@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  userId: any;
  createForm: FormGroup;
  services: any;
  order: any;
  orderDto:any;
  OrderObj: OrderDetail = new OrderDetail();
  OrderList: OrderDetail[] = [];
  customers: any;
  public service: any;
  public changeType?: any;
  public name = '';


  constructor(private tokenStorage: TokenStorageService, private formBuilder: FormBuilder,
              private  router: Router,
              private orderDetailService: OrderDetailService,
              private orderService: OrderService,
              private  servicesService: ServiceService,
              private toast: ToastrService,
              private  accountService: AccountService,
              private customerService:CustomerService
  ) {
    this.userId = this.tokenStorage.getUser().id;
    console.log(this.userId);
    this.customerService.findByIdAccount(this.userId).subscribe(data => {
      this.customers = data;
      console.log(this.customers);
    });
  }

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  initData() {
    this.servicesService.getListServices().subscribe(data => {
      this.services = data;
      this.changeType = data[0];
    }, error => {
      console.log('Loi services:' + error);
    });
  }

  initForm() {
    this.createForm = this.formBuilder.group({
      services: ['', [Validators.required]],
      quantity: ['', [Validators.required, this.validateInterger]],
    });
  }
  validateInterger(abstractControl: AbstractControl) {
    return (abstractControl.value > 0 && abstractControl.value % 1 === 0) ? null : {checkInterger: true};
  }
  createOrder() {
    if (this.createForm.valid) {
      if (this.createForm.value.quantity > this.createForm.value.services.quantity){
        this.toast.warning('Larger quantity in stock!!!.Please re-enter the quantity.')
      }else {
        this.OrderObj = Object.assign({}, this.createForm.value);
        this.OrderObj.totalPrices = this.OrderObj.quantity * this.OrderObj.services.prices;
        this.OrderList.push(this.OrderObj);
      }
    }
  }
  Finish() {
    let orderDto = new OrderDto();
    orderDto.customerId = this.customers.customerId;
    this.orderService.createOrder(orderDto).subscribe(data => {
      // @ts-ignore
      orderDto = data;
      this.orderDetailService.createOrderDetail(this.OrderList, orderDto.orderId).subscribe();
    });
    this.router.navigateByUrl('/order/list-order-customer');
    this.toast.success('Successfully create Order !', 'Order : ');
  }
}
