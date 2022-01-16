import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CustomerService} from '../../../service/customer/customer.service';
import {Customer} from '../../../model/customer/customer';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-choose-customer',
  templateUrl: './choose-customer.component.html',
  styleUrls: ['./choose-customer.component.css']
})
export class ChooseCustomerComponent implements OnInit {

  customerList: Customer[];
  totalPage = 0;
  page: number;
  searchForm: FormGroup;
  flagSearch: number;

  constructor(public dialogRef: MatDialogRef<ChooseCustomerComponent>,
              private customerService: CustomerService,
              private toasts: ToastrService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('', Validators.maxLength(50))
    });
    this.page = 0;
    this.flagSearch = 0;
    this.getCustomerList(this.page);
  }

  getCustomerList(page: number) {
    this.customerService.getCustomerListLinh(page).subscribe(data => {
      this.customerList = data.content;
      this.totalPage = data.totalPages;
    }, error => {
      this.toasts.info('Không có thông tin khách hàng', 'Thông báo');
    });
  }

  closeChooseCustomer() {
    Swal.fire({
      title: 'Bạn có muốn quay lại màn hình cầm đồ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Không',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then((result) => {
      if (result.value) {
        this.dialogRef.close();
      }
    });
  }

  chooseCustomer(customer: Customer) {
    this.dialogRef.close(customer);
  }

  searchCustomer(page: number) {
    this.flagSearch = 1;
    this.customerService.searchToCreateContract(page, this.searchForm.value.keyword).subscribe(data => {
      this.customerList = data.content;
      this.totalPage = data.totalPages;
    }, error => {
      this.toasts.info('Không có thông tin khách hàng', 'Thông báo');
      this.flagSearch = 0;
    });
  }

  setPage() {
    if (this.flagSearch === 1) {
      this.page = 0;
    }
  }

  goPreviousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    if (this.flagSearch === 0) {
      this.getCustomerList(this.page);
    } else {
      this.searchCustomer(this.page);
    }
  }

  goNextPage() {
    if (this.page < this.totalPage - 1) {
      this.page++;
    }
    if (this.flagSearch === 0) {
      this.getCustomerList(this.page);
    } else {
      this.searchCustomer(this.page);
    }
  }

  goPage(value: string) {
    const searchPage = Number(value) - 1;
    if ( searchPage < this.totalPage && searchPage >= 0) {
      if (this.flagSearch === 0) {
        this.getCustomerList(searchPage);
      } else {
        this.searchCustomer(searchPage);
      }
    } else {
      if (value === '') {
        this.toasts.warning('Vui lòng nhập số trang', 'Thông báo');
      } else {
        this.toasts.warning('Vui lòng nhập đúng số trang', 'Thông báo');
      }
    }
  }
}
