import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../Shared/interfaces';
import {AuthService} from '../../Shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    public form: FormGroup;
    public submitted = false;
    public message: string;

    constructor(
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {

        this.route.queryParams.subscribe((params: Params) => {
            if (params.sessionEnd) {
                this.message = 'Пожалуйста, введите данные';
            }
        });

        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ])
        });
    }

    public submit() {
        if (this.form.invalid) {
            return;
        }

        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password
        };

        this.submitted = true;

        this.auth.login(user).then(() => {
            this.form.reset();
            this.submitted = false;
        });
    }
}
