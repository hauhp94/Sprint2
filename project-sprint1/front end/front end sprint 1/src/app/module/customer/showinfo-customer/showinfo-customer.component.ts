import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomerService} from "../../../service/customer/customer.service";
import {AddressService} from "../../../service/address/address.service";
import {AccountService} from "../../../service/account/account.service";
import {TokenStorageService} from "../../../service/account/token-storage.service";

@Component({
  selector: 'app-showinfo-customer',
  templateUrl: './showinfo-customer.component.html',
  styleUrls: ['./showinfo-customer.component.css']
})
export class ShowinfoCustomerComponent implements OnInit {

  customerUpdateForm: FormGroup;
  public customers: any;
  genderList: any;
  provinceList: any;
  districtList: any;
  communeList: any;
  private provinceId: number;
  private districtId: number;
  userId: any;
  constructor(private customerService: CustomerService,
              private router: Router,
              private toast: ToastrService,
              private addressService: AddressService,
              private  accountService: AccountService,
              private tokenStorage: TokenStorageService) {
    this.userId = this.tokenStorage.getUser().id;
  }

  ngOnInit(): void {
    this.updateForm();
    this.getCustomerById();
    this.getProvinceList();

  }

  updateForm() {
    this.customerUpdateForm = new FormGroup({
      customerId: new FormControl(''),
      fullName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required, this.checkDateOfBirth]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0\\d{9,10}$')]),
      address: new FormGroup({
        addressId: new FormControl(''),
        province: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        commune: new FormControl('', [Validators.required])
      })
    });
  }

  getCustomerById() {
    this.customerService.findByIdAccount(this.userId).subscribe(data => {
      this.customers = data;

      this.customerUpdateForm.patchValue(data);
      this.customerUpdateForm.patchValue({username: this.customers.account.username})
      this.provinceId = this.customerUpdateForm.value.address.province.provinceId;
      this.districtId = this.customerUpdateForm.value.address.district.districtId;
      this.getDistrictList(this.provinceId);
      this.getCommuneList(this.districtId);
    }, error => {
      console.log("GetInfoCustomer" + error + "BackEnd");
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
      console.log(this.communeList);
    });
  }

  checkDateOfBirth(data: AbstractControl): any {
    const dateOfBirth = data.value;
    const birthOfYear = Number(dateOfBirth.substr(0, 4));
    const currentYear = new Date().getFullYear();
    return currentYear - birthOfYear >= 18 ? null : {invalidAge: true};
  }

  updateCustomer() {
    console.log(this.customerUpdateForm.value);
    this.customerService.updateCusUDto(this.customerUpdateForm.value).subscribe(() => {
      this.customerUpdateForm.controls.itens.value[0].controls['address'].patchValue({addressId: this.customers.address.addressId})
    });
    this.router.navigateByUrl('/guest-homepage/home')
    this.showSuccess();
  }

  showSuccess() {
    this.toast.success('Update customer successfully !');
  }


  getProvince() {
    this.provinceId = this.customerUpdateForm.value.address.province.provinceId;
    this.getDistrictList(this.provinceId);
  }

  getDistrict() {
    this.districtId = this.customerUpdateForm.value.address.district.districtId;
    this.getCommuneList(this.districtId);
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

}
