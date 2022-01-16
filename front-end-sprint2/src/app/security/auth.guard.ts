import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../service/security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.tokenStorageService.getUser();


    if (currentUser !== null) {
      if (currentUser.roles.includes('ROLE_ADMIN') || currentUser.roles.includes('ROLE_USER')) {
        return true;
      } else {
        this.router.navigate([''], {queryParams: {returnUrl: state.url}});
        alert('Bạn không có quyền truy cập trang này ! ');
        return false;
      }
    } else {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

}
