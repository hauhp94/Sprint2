import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../service/customer/customer.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {DateBirthSearchValidator} from '../common/validateDate.validator';
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {AddressService} from "../../../service/address/address.service";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customers: any;
  statusList: any;
  provinceList: any;
  totalPage = 0;
  page = 0;
  flagSearch: number;
  searchForm: FormGroup;
  nameDelete: string;
  idDelete: number;
  phonePipe: string;
  private roles: string[];
  isLogged = false;
  showAdminBoard = false;

  constructor(private tokenStorageService: TokenStorageService,
              private customerService: CustomerService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.isLogged = !!this.tokenStorageService.getToken();

    if (this.isLogged) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_MODERATOR')) {
        this.showAdminBoard = true;
      }
    }
    this.searchForm = new FormGroup(
      {
        account: new FormControl(''),
        address: new FormControl(''),
        dateOfBirthFrom: new FormControl(''),
        dateOfBirthTo: new FormControl(''),
        status: new FormControl('')
      }, {validators: DateBirthSearchValidator});
    this.flagSearch = 0;
    this.getAllCustomer();
    this.getStatusAndProvince();
  }

  getAllCustomer() {
    this.customerService.getAllCustomer(this.page).subscribe(value => {
      console.log(value);
      this.customers = value.content;
      this.totalPage = value.totalPages;
      console.log(this.totalPage);
    }, error => {
    });
  }

  getStatusAndProvince() {
    this.customerService.getAllStatus().subscribe(value => {
      console.log(value);
      this.statusList = value;
    });
    this.customerService.getAllProvince().subscribe(value => {
      console.log(value);
      this.provinceList = value;
    });
  }


  searchCustomer() {
    this.flagSearch = 1;
    if (this.searchForm.value.account === '' && this.searchForm.value.dateOfBirthFrom === '' &&
      this.searchForm.value.dateOfBirthTo === '' && this.searchForm.value.status === '' && this.searchForm.value.address === '') {
      this.toast.warning('Please enter if you want to search', 'massage search');
      // } else {
      //   if (!this.checkValidate(this.searchForm.value.account)) {
      //     this.toast.warning("Account no content special character", "note");
      //     console.log("Đại chỉ lỗi");
      //   } else {
      //     if (!this.checkValidate(this.searchForm.value.address)) {
      //       this.toast.warning("Address no content special character", "note");
      //       console.log("account lỗi");
    } else {
      console.log(this.searchForm.value);
      this.customerService.searchCustomer(this.page, this.searchForm.value.account, this.searchForm.value.status,
        this.searchForm.value.address, this.searchForm.value.dateOfBirthFrom,
        this.searchForm.value.dateOfBirthTo
      ).subscribe(value => {
        this.totalPage = value.totalPages;
        this.customers = value.content;
        console.log(value.content);
        console.log(this.totalPage);
      }, error => {
        this.toast.error('not found customer', 'message search', {
          timeOut: 5000
        });
        this.flagSearch = 0;
      });
    }
  }


  // checkValidate(a: string) {
  //   const check = /[A-Za-z0-9_-]{0,50}$/;
  //   return check.test(a);
  // }


  setPage() {
    if (this.flagSearch == 1) {
      this.page = 0;
    }
  }

  firstPage() {
    this.page = 0;
    this.getAllCustomer();
  }


  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    console.log(this.page);
    if (this.flagSearch == 0) {
      this.getAllCustomer();
    } else {
      this.searchCustomer();
    }
  }

  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page++;
    } else {
      this.page = this.totalPage - 1;
    }
    console.log(this.page);
    if (this.flagSearch == 0) {
      this.getAllCustomer();
    } else {
      this.searchCustomer();
    }
  }

  lastPage() {
    this.page = this.totalPage - 1;
    this.getAllCustomer();

  }

  toPage(page: number) {
    if (page < this.totalPage && page >= 0) {
      this.page = page;
      if (this.flagSearch == 0) {
        console.log(page);
        this.getAllCustomer();
      } else {
        this.searchCustomer();
      }
    } else {
      this.toast.warning('Request to enter the number of pages in the list', 'massage search page');
      if (this.flagSearch == 0) {
        console.log(page);
        this.getAllCustomer();
      } else {
        this.searchCustomer();
      }
    }
  }

  showDelete(name: string, id: number) {
    this.nameDelete = name;
    this.idDelete = id;
    console.log(this.nameDelete, this.idDelete);
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.idDelete).subscribe(value => {
        this.reset();
        // this.ngOnInit();
        this.toast.success('delete ' + this.nameDelete + ' success', 'massage delete');
      },
      error => {
        this.toast.info('delete ' + this.nameDelete + 'failure', 'massage delete');
      });
  }

  reset() {
    this.searchForm = new FormGroup(
      {
        account: new FormControl(''),
        address: new FormControl(''),
        dateOfBirthFrom: new FormControl(''),
        dateOfBirthTo: new FormControl(''),
        status: new FormControl('')
      }
    );
    this.flagSearch = 0;
    this.page = 0;
    this.getAllCustomer();
  }
}

