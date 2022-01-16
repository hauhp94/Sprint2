import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../../service/customer/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {Account} from '../../../model/account/account';
import {AddressService} from "../../../service/address/address.service";


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerEditForm: FormGroup;
  genderList: any;
  provinceList: any;
  districtList: any;
  communeList: any;
  statusList: any;
  id: number;
  private provinceId: number;
  private districtId: number;


  constructor(private customerService: CustomerService,
              private router: Router,
              private toasts: ToastrService,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
              private  addressService: AddressService) {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.titleService.setTitle('Edit Customer');
    this.customerEditForm = new FormGroup({
      customerId: new FormControl(''),
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
    this.getCustomerById();
  }

  editCustomer() {
    console.log(this.customerEditForm.value);
    this.customerService.updateCusDto(this.customerEditForm.value).subscribe(() => {
      this.router.navigateByUrl('/customer/list')
      this.toasts.success('Update new customer successfully !');
    });
  }

  getCustomerById() {
    console.log('this.id=' + this.id);
    this.customerService.findByIdCustomer(this.id).subscribe(data => {

      this.customerEditForm.patchValue(data);
      this.provinceId = this.customerEditForm.value.address.province.provinceId;
      this.districtId = this.customerEditForm.value.address.district.districtId;
      this.getDistrictList(this.provinceId);
      this.getCommuneList(this.districtId);
      console.log('data' + data);
    }, error => {
      console.log('GetInfoCustomer' + error + 'BackEnd');
    });
  }

  getGenderList() {
    this.customerService.getAllGender().subscribe(data => {
      this.genderList = data;
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
    });
  }

  checkDateOfBirth(data: AbstractControl): any {
    const dateOfBirth = data.value;
    const birthOfYear = Number(dateOfBirth.substr(0, 4));
    const currentYear = new Date().getFullYear();
    return currentYear - birthOfYear >= 18 ? null : {invalidAge: true};
  }

  getProvince() {
    this.provinceId = this.customerEditForm.value.address.province.provinceId;
    this.getDistrictList(this.provinceId);
  }

  getDistrict() {
    this.districtId = this.customerEditForm.value.address.district.districtId;
    this.getCommuneList(this.districtId);
  }


  compareFnG(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.genderId === c2.genderId : c1 === c2;
  }
  compareFnPro(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.provinceId === c2.provinceId : c1 === c2;
  }
  compareFnD(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.districtId === c2.districtId : c1 === c2;
  }
  compareFnC(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.communeId === c2.communeId : c1 === c2;
  }
  compareFnSta(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.statusId === c2.statusId : c1 === c2;
  }
}

