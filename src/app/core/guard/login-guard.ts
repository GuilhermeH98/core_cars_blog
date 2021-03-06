import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root'})
export class LoginGuard implements CanActivate{

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
            boolean | import("@angular/router").UrlTree |
            import("rxjs").Observable<boolean |
            import("@angular/router").UrlTree> |
            Promise<boolean |
            import("@angular/router").UrlTree> {

        if(this.userService.isLogged() === true){
            this.router.navigate(['cars']);
            return false;
        }
        return true;
    }

}
