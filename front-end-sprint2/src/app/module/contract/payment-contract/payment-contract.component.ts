import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ChooseContractComponent} from '../choose-contract/choose-contract.component';
import {ContractService} from '../../../service/contract/contract.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-payment-contract',
  templateUrl: './payment-contract.component.html',
  styleUrls: ['./payment-contract.component.css']
})
export class PaymentContractComponent implements OnInit {
  paymentForm: FormGroup;
  date: any;
  startDate: any;
  endDate: any;
  profitPerDate = 1;
  paymentDate: any;

  constructor(private matDialog: MatDialog,
              private toast: ToastrService,
              private contractService: ContractService,
              private title: Title) {
    title.setTitle('Trả đồ');
  }

  ngOnInit(): void {
    this.getCurrentDate();
    this.paymentForm = new FormGroup({
      contractId: new FormControl({value: '', disabled: true}),
      contractCode: new FormControl({value: '', disabled: true}),
      customerName: new FormControl({value: '', disabled: true}),
      productName: new FormControl({value: '', disabled: true}),
      loan: new FormControl({value: '', disabled: true}),
      profit: new FormControl({value: '', disabled: true}),
      startDate: new FormControl({value: '', disabled: true}),
      endDate: new FormControl({value: '', disabled: true}),
      paymentDate: new FormControl({value: '', disabled: true}),
      totalMoney: new FormControl({value: '', disabled: true})
    });
  }

  getCurrentDate() {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    this.date = year + '-' + month + '-' + date;
    this.paymentDate = date;
  }

  paymentContract() {
    this.contractService.paymentContract(this.paymentForm.value).subscribe(value => {
      this.toast.success('Hợp đồng ' + this.paymentForm.value.contractCode + ' đã thanh toán ');
      this.resetForm();
    }, error => {
      this.toast.error('Vui lòng chọn hợp đồng muốn thanh toán ');
    });
  }

  chooseContract() {
    const dialogRef = this.matDialog.open(ChooseContractComponent, {
      width: '800px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        result.customerName = result.customer.name;
        // this.profitPerDate = result.profit / ((new Date(result.endDate).getTime() -
        //   new Date(result.startDate).getTime()) / (24 * 3600 * 1000));
        this.endDate = result.endDate.substr(8, 2);
        result.paymentDate = this.date;
        if (this.paymentDate <= this.endDate) {
          result.totalMoney = this.earlyPayment(result.loan, result.profit);
        } else {
          result.totalMoney = this.latePayment(result.loan, result.profit);
        }
        this.paymentForm.patchValue(result);
      }
    });
  }

  resetForm() {
    this.paymentForm.reset();
  }

  calculatorProfitPerDate(profit: number, endDate: number, startDate: number) {
    this.profitPerDate = profit / (endDate - startDate);
    this.endDate = endDate;
  }

  earlyPayment(loan: number, profit: number) {
    return loan * ((1 + this.profitPerDate / 100 / 2 * (this.endDate - this.paymentDate))) + profit;
  }

  latePayment(loan: number, profit: number) {
    return loan * ((1  + this.profitPerDate / 100 * 2 * (this.paymentDate - this.endDate))) + profit;
  }
}
