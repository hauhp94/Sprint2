
import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../service/customer/customer.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AddressService} from "../../../service/address/address.service";
import {AccountService} from "../../../service/account/account.service";
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username;
  currentAccount: any;
  data;
  oldPass: string = '';
  notification: string;
  form: FormGroup;
  newPwNotify: string = '';
  constructor(private customerService: CustomerService,
              private router: Router,
              private toast: ToastrService,
              private addressService: AddressService,
              private  accountService: AccountService,
              private tokenStorage: TokenStorageService,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.currentAccount = this.tokenStorage.getUser();
    this.username = this.currentAccount.username;

    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      confirmNewPassword: ['', [Validators.required, this.comparePassword]]
    }, {validators: this.comparePassword })
  }

  comparePassword(c: AbstractControl) {
    const value = c.value;
    return (value.newPassword === value.confirmNewPassword) ? null : {
      passwordNotMatch: true
    };
  }
  getOldPass() {
    if (this.oldPass == null || this.oldPass == '' || this.oldPass == undefined) {
      this.notification = 'Please enter a password';
    } else {
      console.log(this.username);
      console.log(this.oldPass);
      this.accountService.getPass(this.username, this.oldPass).subscribe(data => {
        if (data) {
          this.notification = '';
          this.showTableNewPw();
        } else {
          this.notification = 'The password is incorrect';
        }
      }, error => {
        console.log("get error " + error + " at getOldPass() on ChangePasswordComponent");
      });
    }
  }
  showTableNewPw() {
    document.getElementById("tableOldPw").style.display = 'none';
    document.getElementById("tableNewPw").style.display = 'block';
  }
  submitNewPwForm(form: FormGroup) {
    this.accountService.setNewPassword(this.username, form.value.newPassword).subscribe(data => {
      this.router.navigateByUrl("/login");
      this.toast.success('Update account successfully !');
    }, error => {
      this.newPwNotify = "Got a problem, can't update your password yet!";
    })
  }
  resetForm() {
    this.form.reset();
  }
}
