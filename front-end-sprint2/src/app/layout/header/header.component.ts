import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {AuthService} from '../../service/security/auth.service';

// // @ts-ignore
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  roles: string[];
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  showEmployeeBoard = false;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  logout() {
    Swal.fire({
      title: 'Bạn có muốn đăng suất ' + this.username + ' ?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then((result) => {
      if (result.value) {
    this.authService.logout(this.tokenStorageService.getUser().employee.employeeId).subscribe();
    this.tokenStorageService.signOut();
    window.location.href = 'http://localhost:4200';
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

}
