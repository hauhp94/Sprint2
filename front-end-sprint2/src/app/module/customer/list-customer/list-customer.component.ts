import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../service/customer/customer.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customerList: any;
  customerNameDelete: string;
  customerCodeDelete: string;
  customerIdDelete: number;
  customerAddressView: any;
  customerBirthDateView: any;
  customerCodeView: any;
  customerEmailView: any;
  customerIdCardView: any;
  customerNameView: any;
  customerPhoneView: any;
  genderNameView: any;
  amountContractView: any;
  totalPage = 0;
  page = 0;
  flagSearch: number;
  searchForm: any;
  is = false;
  customerCode: any;
  keySearch: any;

  constructor(private customerService: CustomerService,
              private toast: ToastrService,
              private router: Router,
              private title: Title
  ) {
title.setTitle('Danh sách khách hàng');
  }

  ngOnInit(): void {
    this.initSearchForm();
    this.searchCustomerList();

  }

  initSearchForm() {
    this.searchForm = new FormGroup(
      {
        customerCode: new FormControl('', [Validators.pattern('^KH-\\d{3}$')]),
        keySearch: new FormControl('', [Validators.maxLength(20)])
      });
  }

  getCustomerList() {
    this.customerService.getCustomerList(this.page).subscribe(data => {
      console.log(data);
      this.customerList = data.content;
      this.totalPage = data.totalPages;
    }, error => {
    });
  }

  searchCustomerList() {
    if (this.searchForm.value.customerCode === '' && this.searchForm.value.keySearch === '') {
      this.customerService.getCustomerList(this.page).subscribe(data => {
        this.customerList = data.content;
        this.totalPage = data.totalPages;
      }, error => {
      });
    } else if (this.searchForm.value.keySearch === '') {
      this.customerService.searchCustomerList(this.page, this.searchForm.value.customerCode).subscribe(data => {
        this.customerList = data.content;
        this.totalPage = data.totalPages;
        // this.toast.success('Truy Cập Thành Công', 'Khách Hàng');
      }, error => {
        this.toast.warning('Mã Khách Hàng không Tồn Tại', 'Khách Hàng');
      });
    } else if (this.searchForm.value.customerCode === '') {
      this.customerService.searchKeyCustomerList(this.page, this.searchForm.value.keySearch).subscribe(data => {
        // this.toast.success('Truy Cập Thành Công', 'Khách Hàng',);
        this.customerList = data.content;
        this.totalPage = data.totalPages;

      }, error => {
        this.toast.warning('Từ Khóa Đang Kiếm Không Tồn Tại', 'Khách Hàng');
      });
    } else {
      this.toast.warning('Chỉ Có Thể Tìm Kiếm Mã Khách Hàng Hoặc Từ Khóa ');
    }
  }

  showInfoDelete(customerName: any, customerCode: any, customerId: any) {
    this.customerCodeDelete = customerCode;
    this.customerNameDelete = customerName;
    this.customerIdDelete = customerId;
  }

  deleteCustomerById() {
    this.customerService.deleteCustomerById(this.customerIdDelete).subscribe(data => {
      document.getElementById('closeModal').click();
      this.getCustomerList();
      this.toast.success(' ' + this.customerNameDelete, 'Xóa Thành Công Khách Hàng');
    }, error => {
      this.toast.warning('Không Tìm Thấy Khách Hàng Trong Cơ Sở Dữ Liệu.');
    });

  }


  showInfoView(customerCode: any, customerAddress: any,
               birthDate: any, email: any, idCard: any,
               customerName: any, phone: string,
               genderName: any, amountContract: any) {
    this.customerAddressView = customerAddress;
    this.customerBirthDateView = birthDate;
    this.customerCodeView = customerCode;
    this.customerEmailView = email;
    this.customerIdCardView = idCard;
    this.customerNameView = customerName;
    this.customerPhoneView = phone;
    this.genderNameView = genderName;
    this.amountContractView = amountContract;
  }

  toPage(page: number) {
    if (page < this.totalPage && page >= 0) {
      this.page = page;
      this.getCustomerList();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    this.searchCustomerList();
  }

  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page++;
    }
    this.searchCustomerList();
  }

  firstPage() {
    this.page = 0;
    this.searchCustomerList();
  }

  lastPage() {
    this.page = this.totalPage - 1;
    this.searchCustomerList();
  }

  setPage() {
    // tslint:disable-next-line:triple-equals
    if (this.flagSearch == 1) {
      this.page = 0;
    }
  }

  resetForm() {
    this.initSearchForm();
    this.customerCode = '';
    this.keySearch = '';
    this.searchCustomerList();
  }
}
