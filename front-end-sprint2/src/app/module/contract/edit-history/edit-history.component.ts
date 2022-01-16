import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Contract} from '../../../model/contract/contract';
import {StatusContract} from '../../../model/contract/status-contract';
import {TypeContract} from '../../../model/contract/type-contract';
import {TypeProduct} from '../../../model/contract/type-product';
import {Customer} from '../../../model/customer/customer';
import {ContractService} from '../../../service/contract/contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import Swal2 from 'sweetalert2';

@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.css']
})
export class EditHistoryComponent implements OnInit {

  // editForm: FormGroup;
  // id: number;
  // contract: Contract;
  // listError: any = '';
  // profitValue: number;
  // statusList: StatusContract[] = [];
  // typeContractList: TypeContract[] = [];
  // typeProductList: TypeProduct[] = [];
  // customerList: Customer[] = [];
  //
  // contractForm: any;
  //
  // constructor(private contractService: ContractService,
  //             private router: Router,
  //             private toasts: ToastrService,
  //             private titleService: Title,
  //             private activatedRoute: ActivatedRoute) {
  //   this.titleService.setTitle('Chỉnh sửa hợp đồng');
  //   this.activatedRoute.paramMap.subscribe(p => {
  //     this.id = +p.get('id');
  //   });
  //   console.log('day la id' + this.id);
  // }
  //
  // ngOnInit(): void {
  //   this.getData();
  //   this.initForm();
  //   this.getContract();
  // }
  //
  // initForm() {
  //   this.editForm = new FormGroup({
  //     contractId: new FormControl(),
  //     contractCode: new FormControl(''),
  //     endDate: new FormControl('', [Validators.required, this.checkEndDate]),
  //     loan: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
  //     productName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  //     profit: new FormControl('', Validators.required),
  //     startDate: new FormControl('', [Validators.required, this.checkStartDate]),
  //     customer: new FormGroup({
  //       customerId: new FormControl(),
  //       birthDate: new FormControl(),
  //       address: new FormControl(),
  //       customerCode: new FormControl(),
  //       email: new FormControl(),
  //       idCard: new FormControl(),
  //       image: new FormControl(),
  //       phone: new FormControl(),
  //       gender: new FormControl(),
  //       name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  //     }),
  //     statusContract: new FormControl('', Validators.required),
  //     typeContract: new FormControl('', Validators.required),
  //     typeProduct: new FormControl('', Validators.required),
  //   });
  // }
  //
  //
  // getContract() {
  //   this.contractService.findById(this.id).subscribe(data => {
  //     this.contract = data;
  //     this.editForm.patchValue(data);
  //     console.log('day la data' + data);
  //   });
  // }
  //
  // edit() {
  //   this.contract = this.editForm.value;
  //   this.contractService.update(this.id, this.contract).subscribe(() => {
  //     this.router.navigateByUrl('/information-store/history-store').then(s => {
  //       this.showSuccess();
  //     });
  //   }, e => {
  //     if (e.status === 400) {
  //       this.listError = e.error;
  //     }
  //     this.showError();
  //   });
  // }
  //
  // showSuccess() {
  //   this.toasts.success('Chỉnh sửa thành công !', 'Thông báo : ');
  // }
  //
  // showError() {
  //   this.toasts.error('Chỉnh sửa thất bại !', 'Cảnh báo: ');
  // }
  //
  //
  // checkStartDate(data: AbstractControl): any {
  //   const startDate = data.value;
  //   const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  //   if (startDate !== currentDate) {
  //     return {invalidStartDate: true};
  //   }
  //   return null;
  // }
  //
  // checkEndDate(data: AbstractControl): any {
  //   const endDate = data.value;
  //   const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  //   if (endDate <= currentDate) {
  //     return {invalidEndDate: true};
  //   }
  //   return null;
  // }
  // calculateProfit(value1: string, value2: string) {
  //   const loan = Number(value1);
  //   const today = new Date();
  //   const endDate = new Date(value2);
  //   const numOfYear = endDate.getFullYear() - today.getFullYear();
  //   const numOfMonth = endDate.getMonth() - today.getMonth();
  //   const numOfDay = endDate.getDate() - today.getDate();
  //
  //   if (numOfYear === 0) {
  //     if (numOfMonth === 0) {
  //       this.profitValue = numOfDay * loan * 0.01;
  //     } else {
  //       this.profitValue = (30 * numOfMonth + numOfDay) * loan * 0.01;
  //     }
  //   } else {
  //     this.profitValue = ((12 * numOfYear + numOfMonth) * 30 + numOfDay) * loan * 0.01;
  //   }
  // }
  //
  // private getData() {
  //   this.contractService.getAllStatusContract().subscribe(data => {
  //     this.statusList = data;
  //   });
  //
  //   this.contractService.getAllTypeContract().subscribe(data => {
  //     this.typeContractList = data;
  //   });
  //
  //   this.contractService.getAllTypeProduct().subscribe(data => {
  //     this.typeProductList = data;
  //   });
  //
  // }
  //
  // compareFn(c1: any, c2: any): boolean {
  //   return c1 && c2 ? c1.statusId === c2.statusId : c1 === c2;
  // }
  // compareFn1(c1: any, c2: any): boolean {
  //   return c1 && c2 ? c1.typeContractId === c2.typeContractId : c1 === c2;
  // }
  // compareFn2(c1: any, c2: any): boolean {
  //   return c1 && c2 ? c1.typeProductId === c2.typeProductId : c1 === c2;
  // }
  //
  // reset() {
  //   this.contractForm = this.editForm.value;
  //
  //   Swal.fire({
  //     title: 'Bạn có muốn khôi phục lại ban đầu ?',
  //     text: 'Hành động sẽ không được hoàn tác !',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#DD6B55',
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No',
  //     allowOutsideClick: false
  //   }).then((result) => {
  //     if (result.value) {
  //       this.getContract();
  //
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       this.editForm.patchValue(this.contractForm);
  //     }
  //   });
  // }
  //
  // back() {
  //   this.contractForm = this.editForm.value;
  //   Swal2.fire({
  //     title: 'Bạn có muốn quay lại danh sách hợp đồng ?',
  //     text: 'Thay đổi sẽ không được lưu !',
  //     icon: 'info',
  //     showCancelButton: true,
  //     confirmButtonColor: '#DD6B55',
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No',
  //     allowOutsideClick: false
  //   }).then((result) => {
  //     if (result.value) {
  //       this.router.navigateByUrl('/information-store/history-store');
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       this.editForm.patchValue(this.contractForm);
  //     }
  //   });
  // }
  editForm: FormGroup;
  id: number;
  contract: Contract;
  listError: any = '';
  profitValue: number;
  statusList: StatusContract[] = [];
  typeContractList: TypeContract[] = [];
  typeProductList: TypeProduct[] = [];
  customerList: Customer[] = [];
  changeLoan = '';
  changeProfit = 0;
  contractForm: any;

  constructor(private contractService: ContractService,
              private router: Router,
              private toasts: ToastrService,
              private titleService: Title,
              private activatedRoute: ActivatedRoute) {
    this.titleService.setTitle('Chỉnh sửa hợp đồng');
    this.activatedRoute.paramMap.subscribe(p => {
      this.id = +p.get('id');
    });
    console.log('day la id' + this.id);
  }

  ngOnInit(): void {
    this.getData();
    this.initForm();
    this.getContract();
  }

  initForm() {
    this.editForm = new FormGroup({
      contractId: new FormControl(),
      contractCode: new FormControl(''),
      endDate: new FormControl('', [Validators.required, this.checkEndDate]),
      loan: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      productName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      profit: new FormControl('', Validators.required),
      startDate: new FormControl('', [Validators.required, this.checkStartDate]),
      customer: new FormGroup({
        customerId: new FormControl(),
        birthDate: new FormControl(),
        address: new FormControl(),
        customerCode: new FormControl(),
        email: new FormControl(),
        idCard: new FormControl(),
        image: new FormControl(),
        phone: new FormControl(),
        gender: new FormControl(),
        name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      }),
      statusContract: new FormControl('', Validators.required),
      typeContract: new FormControl('', Validators.required),
      typeProduct: new FormControl('', Validators.required),
    });
  }


  getContract() {
    this.contractService.findById(this.id).subscribe(data => {
      this.contract = data;
      this.editForm.patchValue(data);
      console.log('day la data' + data);
    });
  }

  edit() {
    this.editForm.value.profit = this.profitValue;
    this.contract = this.editForm.value;
    this.contractService.update(this.id, this.contract).subscribe(() => {
      this.router.navigateByUrl('/information-store/history-store').then(s => {
        this.showSuccess();
      });
    }, e => {
      if (e.status === 400) {
        this.listError = e.error;
      }
      this.showError();
    });
  }

  showSuccess() {
    this.toasts.success('Chỉnh sửa thành công !', 'Thông báo : ');
  }

  showError() {
    this.toasts.error('Chỉnh sửa thất bại !', 'Cảnh báo: ');
  }


  checkStartDate(data: AbstractControl): any {
    const startDate = data.value;
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if (startDate !== currentDate) {
      return {invalidStartDate: true};
    }
    return null;
  }

  checkEndDate(data: AbstractControl): any {
    const endDate = data.value;
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if (endDate <= currentDate) {
      return {invalidEndDate: true};
    }
    return null;
  }

  calculateProfit(value1: string, value2: string) {
    const loan = Number(value1);
    const today = new Date();
    const endDate = new Date(value2);
    const numOfYear = endDate.getFullYear() - today.getFullYear();
    const numOfMonth = endDate.getMonth() - today.getMonth();
    const numOfDay = endDate.getDate() - today.getDate();

    if (numOfYear === 0) {
      if (numOfMonth === 0) {
        this.profitValue = numOfDay * loan * 0.01;
      } else {
        this.profitValue = (30 * numOfMonth + numOfDay) * loan * 0.01;
      }
    } else {
      this.profitValue = ((12 * numOfYear + numOfMonth) * 30 + numOfDay) * loan * 0.01;
    }
    this.changeProfit = this.profitValue;
  }

  private getData() {
    this.contractService.getAllStatusContract().subscribe(data => {
      this.statusList = data;
    });

    this.contractService.getAllTypeContract().subscribe(data => {
      this.typeContractList = data;
    });

    this.contractService.getAllTypeProduct().subscribe(data => {
      this.typeProductList = data;
    });

  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.statusId === c2.statusId : c1 === c2;
  }
  compareFn1(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.typeContractId === c2.typeContractId : c1 === c2;
  }
  compareFn2(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.typeProductId === c2.typeProductId : c1 === c2;
  }

  reset() {
    this.contractForm = this.editForm.value;

    Swal.fire({
      title: 'Bạn có muốn khôi phục lại ban đầu ?',
      text: 'Hành động sẽ không được hoàn tác !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.getContract();

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.editForm.patchValue(this.contractForm);
      }
    });
  }

  back() {
    this.contractForm = this.editForm.value;
    Swal2.fire({
      title: 'Bạn có muốn quay lại danh sách hợp đồng ?',
      text: 'Thay đổi sẽ không được lưu !',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/information-store/history-store');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.editForm.patchValue(this.contractForm);
      }
    });
  }


}
