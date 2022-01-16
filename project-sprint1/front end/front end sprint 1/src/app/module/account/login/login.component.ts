import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../service/account/auth.service";
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from "../../../service/category/category.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  category: any;
  formSignIn: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private categoryService: CategoryService,
              private tokenStorage: TokenStorageService,
              public router: Router, public toastr: ToastrService) {
    this.formSignIn = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;

      for (const role of this.roles) {
        if (role === 'ROLE_USER') {
          console.log(role);
          this.router.navigateByUrl('/guest-homepage/home');
          break;
        } else {
          this.router.navigateByUrl('/order/list');
        }
      }
    }
    this.categoryService.findById(this.tokenStorage.getUser().category).subscribe(data => {
      this.category = data;
    })

    console.log(this.category)
  }

  onSubmit() {
    this.authService.login(this.formSignIn.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.toastr.success("Sign in", 'success');

        for (const role of this.roles) {
          if (role === 'ROLE_USER') {
            console.log(role);
            this.router.navigateByUrl('/guest-homepage/home');
            this.reloadPage();
            break;
          } else {
            this.router.navigateByUrl('/');
            this.reloadPage();
          }
        }
      },
      err => {
        console.log(err)
        if(err.status == 400) {
          this.toastr.error("Your account does not have enough money, please add more money to use", 'SingIn error ')
        }else {
          this.toastr.error('Username or password is incorrect', 'SingIn error ', {
            timeOut: 2000,
            extendedTimeOut: 1500
          });
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      }
    );
  }

  reset() {
    this.formSignIn.reset();
  }

  reloadPage() {
    window.location.reload();
  }
}
