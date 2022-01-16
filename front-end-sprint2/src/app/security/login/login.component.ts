import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../service/security/auth.service';
import {TokenStorageService} from '../../service/security/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  remember = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              public router: Router, public toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    console.log(this.remember);
    this.authService.login(this.form).subscribe(
      data => {
        if (this.remember) {
          this.tokenStorage.saveTokenLocal(data.accessToken);
          this.tokenStorage.saveUserLocal(data);
        } else {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
        }
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        const time: string = this.tokenStorage.getUser().userTime;
        const curentTime: string = new Date().toISOString().slice(0, 10);
        // @ts-ignore
        if (30 < (new Date(curentTime) - new Date(time)) / (1000 * 60 * 60 * 24)) {
          this.router.navigate(['login/changPassword/' + this.tokenStorage.getUser().username]);
          this.toastr.error('Mật khẩu hết hạn ', 'Thông báo');
        } else {
          window.location.href = 'http://localhost:4200/create-contract';
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
