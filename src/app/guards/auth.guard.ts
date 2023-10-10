import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate{
  constructor(
    private userService:UserService,
    private router:Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isAuthenticated()) {
      console.log(this.userService.isAuthenticated())
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
