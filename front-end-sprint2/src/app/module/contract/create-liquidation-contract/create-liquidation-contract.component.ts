import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContractService} from '../../../service/contract/contract.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ChooseLiquidationComponent} from '../choose-liquidation/choose-liquidation.component';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Contract} from '../../../model/contract/contract';
import {ChooseCustomerComponent} from '../choose-customer/choose-customer.component';
import {Customer} from '../../../model/customer/customer';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {DeleteContractComponent} from '../delete-contract/delete-contract.component';
import {DetailProductComponent} from '../detail-product/detail-product.component';




@Component({
  selector: 'app-create-liquidation-contract',
  templateUrl: './create-liquidation-contract.component.html',
  styleUrls: ['./create-liquidation-contract.component.css']
})
export class CreateLiquidationContractComponent implements OnInit {

  listContractId1 = [];
  listContractId2 = [];
  formCreate: FormGroup;
  contracts: Contract[] = [];
  selectedCustomer: Customer;
  customerName: string = '';
  customerId: number;
  nameProduct: string = ' ';
  loading = false;
  loan: number = 0;
  receiveContract: Contract;
  checkUpdate = false;
  changeLoan = '';

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');

  }


  constructor(private contractService: ContractService,
              private dialog: MatDialog,
              private toasts: ToastrService,
              private router: Router,
              private title: Title
  ) {
    this.title.setTitle('Thanh lý');
    /*console.log(this.date)*/
  }

  ngOnInit(): void {
    this.formCreate = new FormGroup({
      contractId: new FormControl(''),
      contractCode: new FormControl(''),
      totalMoney: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100000000), Validators.pattern('^[0-9]*$')]),
      dateLiquidation: new FormControl(this.formatDate(new Date()), [Validators.required, checkDate]),
      productName: new FormControl(''),
      customer: new FormGroup({
        customerId: new FormControl(''),
      }),
      loan: new FormControl(''),
    });
    if (this.contractService.contract != null) {
      this.receiveContract = this.contractService.receiveContract();
      console.log(this.receiveContract);
      this.formCreate.patchValue({
        contractCode: this.receiveContract.contractCode,
        productName: this.receiveContract.productName
      });
      console.log(this.formCreate);
      /*this.formCreate.patchValue(this.receiveContract);*/
      this.checkUpdate = true;
    }
  }


  onChooseProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ChooseLiquidationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      this.listContractId1 = this.contractService.ReceiveData();
      console.log(this.listContractId1);
      this.getContracts();
      /*  this.getProducts();*/

      /*for (let i = 0; i < this.contracts.length; i++) {
        this.nameProduct = this.contracts[i].productName /!*+ ', ' + this.nameProduct;*!/
      }*/
      console.log(this.contracts);


    });
  }

  getContracts() {
    for (let i = 0; i < this.listContractId1.length; i++) {
      this.contractService.getContractById(this.listContractId1[i]).subscribe(value => {
        /*console.log(value.productName);*/
        this.nameProduct = value.productName + ', ' + this.nameProduct;
        this.loan = this.loan + value.loan;
        this.contracts.push(value);
        console.log(this.nameProduct);
      });
    }

  }

  getProducts() {
    for (let i = 0; i < this.contracts.length; i++) {
      this.nameProduct = this.contracts[i].productName + ', ' + this.nameProduct;
    }
  }


  reset() {
    console.log(this.listContractId1);
    for (let i = 0; i < this.contracts.length; i++) {
      this.contractService.setStatusLiquidById(this.contracts[i].contractId, 1).subscribe();
    }
    this.contractService.resetData();
    this.listContractId1 = [];
    this.contracts = [];
    this.selectedCustomer = null;
    this.customerName = '';
    this.nameProduct = '';
    this.ngOnInit();
    this.changeLoan = '';
    this.loan = 0;
    this.toasts.success('Xóa dữ liệu thành công!.', 'Thông báo');

  }

  resetNotMessage() {
    for (let i = 0; i < this.listContractId1.length; i++) {
      this.contractService.setStatusLiquidById(this.listContractId1[i], 1).subscribe();
    }
    this.contractService.resetData();
    this.listContractId1 = [];
    this.contracts = [];
    this.selectedCustomer = null;
    this.customerName = '';
    this.nameProduct = '';
    this.ngOnInit();
    this.changeLoan = '';
    this.loan = 0;
  }

  resetUpdate() {
    this.selectedCustomer = null;
    this.customerName = '';
  }

  onChooseCustomer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    const dialogRef = this.dialog.open(ChooseCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value != null) {
        this.customerName = value.name;
        this.customerId = value.customerId;
        this.selectedCustomer = value;
        console.log(value);
      }
    });
  }

  createLiquidationContract() {
    console.log(this.nameProduct);
    console.log(this.formCreate.value);
    this.formCreate.patchValue({
      productName: this.nameProduct,
      customer: this.selectedCustomer,
      loan: this.loan
    });
    this.listContractId2 = this.listContractId1;
    console.log(this.listContractId2);
    this.contractService.createLiquidationContract(this.formCreate.value).subscribe(value => {
      console.log(value);
      this.toasts.success('Tạo mới hợp đồng thanh lý thành công.', 'Thông báo');
    }, error => {
      console.log(this.listContractId2);
      for (let i = 0; i < this.listContractId2.length; i++) {
        this.contractService.setStatusLiquidById(this.listContractId2[i], 1).subscribe();
      }
      this.toasts.error('Tạo mới hợp đồng thanh lý thất bại, vui lòng kiểm tra lại thông tin nhập vào.',
        'Thông báo');
    });
    this.listContractId1 = [];
    this.resetNotMessage();
  }

  updateLiquidationContract() {
    console.log(this.formCreate.value.contractCode);
    console.log(this.formCreate.value.totalMoney);
    console.log(this.formCreate.value);
    this.formCreate.patchValue({
      customer: this.selectedCustomer,
      contractId: this.receiveContract.contractId
    });
    this.contractService.updateLiquidationContract(this.formCreate.value).subscribe(value => {
      console.log(value);
      this.toasts.success('Tạo mới hợp đồng thanh lý thành công.', 'Thông báo');
      this.router.navigateByUrl('/information-store/history-store');
    }, error => {
      this.toasts.error('Tạo mới hợp đồng thanh lý thất bại, vui lòng kiểm tra lại thông tin nhập vào.',
        'Thông báo');
    });
    this.resetUpdate();
  }

  deleteProduct(productName: string, loan: number, idContract: number) {
    const dialogRef = this.dialog.open(DetailProductComponent, {
      panelClass: 'dialog-container-custom',
      width: '700px',
      data: {
        productName: productName,
        loan: loan
      }
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        console.log(this.contracts);
        for (let i = 0; i < this.contracts.length; i++) {
          console.log(this.contracts.length)
          if (this.contracts[i].contractId == idContract) {
            const loan2 = this.contracts[i].loan
            this.contracts.splice(i, 1);
            console.log(this.contracts);
            this.nameProduct = '';
            this.getProducts();
            console.log(this.nameProduct);
            this.loan = this.loan - loan2;
            console.log(this.loan);
            this.contractService.setStatusLiquidById(idContract, 1).subscribe();
          }
        }
        console.log(this.contracts);
      }
    });
  }
}

function checkDate(fc: FormControl): any {
  return (fc.value.substr(8, 10) != new Date(Date.now()).getDate()) ? {date: true} : null;
}

/*function checkLoans(fc: AbstractControl): any {
  return (fc.value <= this.loan) ? {total: true} : null;
}*/



