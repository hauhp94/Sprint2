import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/account/token-storage.service";
import {CategoryService} from "../../service/category/category.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../../service/account/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  private roles: string[];
  isLogged = false;
  showUserBoard = false;
  showModBoard = false;
  showAdminBoard = false;
  showModAdminBoard = false;
  username: string;
  category: any;

  constructor(private tokenStorageService: TokenStorageService,
              private categoryService: CategoryService,
              private router: Router,private authService: AuthService) {
  }

  ngOnInit() {
    this.isLogged = !!this.tokenStorageService.getToken();

    if (this.isLogged) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
    }
    if (this.isLogged) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if (this.roles.includes('ROLE_MODERATOR')){
        this.showModBoard = true;
      }
      if (this.roles.includes('ROLE_ADMIN')){
        this.showAdminBoard = true;
      }
      if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_MODERATOR')){
        this.showModAdminBoard = true;
      }
    }
    this.categoryService.findById(this.tokenStorageService.getUser().category).subscribe(data => {
      this.category = data;
      console.log(this.category)
    })
  }

  logout() {
    Swal.fire({
      title: 'Are you sure log out?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then((result) => {
      if (result.value) {
        // @ts-ignore
        if(this.roles == "ROLE_USER"){
          this.categoryService.edit(this.category).subscribe();
          // @ts-ignore
          this.authService.logout().subscribe();
        }

        console.log(this.roles);
        this.tokenStorageService.signOut();
        window.location.href = "http://localhost:4200";
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

}
