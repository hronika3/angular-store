import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService,
                private router: Router) {
    }

    public canActivate(next: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('this.auth.isAuthenticated()', this.auth.isAuthenticated());
        if (this.auth.isAuthenticated()) {
            console.log('guard true');
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}
