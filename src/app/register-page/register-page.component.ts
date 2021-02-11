import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../shared/interfaces';
import {UserAuthService} from '../shared/services/userAuth.service';
import {AuthService} from '../admin/shared/services/auth.service';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    message: string;
    user: User;

    constructor(
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

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

    submit() {
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
