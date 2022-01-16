import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {TokenStorageService} from 'src/app/service/account/token-storage.service';
import {Observable} from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //creator: Tra
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,public toastr: ToastrService) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.tokenStorageService.getUser();


    if (currentUser !== null) {
      if (currentUser.roles.includes('ROLE_ADMIN')) {
        return true;
      } else {
        this.router.navigate([''], {queryParams: {returnUrl: state.url}});
        this.toastr.success('Thanks!', 'You can not access this page!');
        return false;
      }
    } else {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

}
