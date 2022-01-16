import {Component, Inject, OnInit} from '@angular/core';
import {Gender} from '../../../model/customer/gender';
import {Province} from '../../../model/address/province';
import {CustomerService} from '../../../service/customer/customer.service';
import {District} from '../../../model/address/district';
import {Commune} from '../../../model/address/commune';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {CustomerStatus} from "../../../model/customer/customer-status";
import {AddressService} from "../../../service/address/address.service";


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerForm: FormGroup;
  genderList: any;
  provinceList: any;
  districtList: any;
  communeList: any;
  statusList: any;
  isUsernameUsed = false;
  private provinceId: number;
  private districtId: number;
  constructor(
    private customerService: CustomerService,
              private router: Router,
              private toasts: ToastrService,
              private titleService: Title,
    private  addressService: AddressService
  ) {
    this.titleService.setTitle('Create Customer');
    this.titleService.setTitle('Create Customer');

    this.customerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0\\d{9,10}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required,this.checkDateOfBirth]),
      gender: new FormControl('', [Validators.required]),
      account: new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]{6,}')]),
      }),
      customerStatus: new FormControl('', [Validators.required]),
      address: new FormGroup({
        province: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        commune: new FormControl('', [Validators.required])
      })
    });
  }




  ngOnInit(): void {
    this.getGenderList();
    this.getStatusList();
    this.getProvinceList();
    // this.createCustomer();
  }

  createCustomer() {
    console.log(this.customerForm.value.account);
    if (this.customerForm.invalid) {
      this.toasts.warning('Please input all info', 'Customer');
    } else {
      this.customerService.checkUsername(this.customerForm.value.account).subscribe(value => {
        this.isUsernameUsed = false;
        this.customerService.saveCusDto(this.customerForm.value).subscribe(data => {
          this.toasts.success('Create new successfully .', 'Customer');
          this.router.navigateByUrl('/customer/list');
          this.customerForm.reset();
        }, error => {
          this.toasts.error('System maintained, please connect to Admin !!!', 'Error');
        });
      }, error => {
        this.isUsernameUsed = true;
      });
    }
  }

  getGenderList() {
    this.customerService.getAllGender().subscribe(data => {
      this.genderList = data;
      console.log(data);
    });
  }



  getProvinceList() {
    this.addressService.getProvinceList().subscribe(data => {
      this.provinceList = data;
    });
  }

  getDistrictList(id: number) {
    this.addressService.getDistrictList(id).subscribe(data => {
      this.districtList = data;
    });
  }

  getCommuneList(id: number) {
    this.addressService.getCommuneList(id).subscribe(data => {
      this.communeList = data;
    });
  }



  getStatusList() {
    this.customerService.getAllCustomerStatus().subscribe(data => {
      this.statusList = data;
      console.log(data);
    });
  }
  checkDateOfBirth(data: AbstractControl): any {
    const dateOfBirth = data.value;
    const birthOfYear = Number(dateOfBirth.substr(0, 4));
    const currentYear = new Date().getFullYear();
    return currentYear - birthOfYear >= 18 ? null : {invalidAge : true};
  }
  getProvince() {
    this.provinceId = this.customerForm.value.address.province.provinceId;
    this.getDistrictList(this.provinceId);
  }

  getDistrict() {
    this.districtId = this.customerForm.value.address.district.districtId;
    this.getCommuneList(this.districtId);
  }
}
