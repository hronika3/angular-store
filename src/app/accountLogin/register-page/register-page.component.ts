import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../Shared/interfaces';
import {AuthService} from '../../Shared/services/auth.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

    public form: FormGroup;
    public submitted = false;
    public message: string;
    public user: User;

    constructor(
        public auth: AuthService
    ) {
    }

    public ngOnInit() {
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
            password: this.form.value.password,
            id: ''
        };

        this.submitted = true;

        this.auth.register(user).then(() => {
            this.form.reset();
            this.submitted = false;
        });

       /* this.auth.register(user).subscribe(() => {
            this.form.reset();
            this.router.navigate(['']);
            this.submitted = false;
        }, () => {
            this.submitted = false;
        });*/
    }

}
