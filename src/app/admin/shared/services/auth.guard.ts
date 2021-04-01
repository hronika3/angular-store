import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService,
                private router: Router) {
    }

    public canActivate(next: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('this.auth.isAuthenteticated()', this.auth.isAuthenteticated());
        if (this.auth.isAuthenteticated()) {
            console.log('guard true');
            return true;
        }
        this.router.navigate(['/admin', 'login']);
        return false;

        /*route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.auth.isAuthenteticated()) {
            return true;
        } else {
            this.auth.logout();
            this.router.navigate(['/admin', 'login'], {
                queryParams: {
                    sessionEnd: true
                }
            });
        }*/
    }
}
