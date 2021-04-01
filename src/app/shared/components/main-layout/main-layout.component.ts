import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../admin/shared/services/auth.service';
import {Router} from '@angular/router';
import {LoginUser} from '../../interfaces';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
    public user: LoginUser;

    constructor(public auth: AuthService,
                private router: Router) {
    }

    public ngOnInit() {

    }

    public logout(event: Event) {
        event.preventDefault();
        this.auth.logout();
        this.router.navigate(['/admin', 'login']);
    }

}
