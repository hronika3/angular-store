/*
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import User = firebase.User;
import {Router} from '@angular/router';

@Injectable()

export class UserAuthService {
    public user: User;
    public result;

    constructor(
        private http: HttpClient,
        private afAuth: AngularFireAuth,
        private router: Router
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                localStorage.setItem('user', null);
            }
        });
    }

    public login(email: string, password: string) {
        this.result = firebase.auth().signInWithEmailAndPassword(email, password);
        this.router.navigate(['/admin', 'dashboard']);
    }

    public logout() {
        firebase.auth().signOut();
        localStorage.removeItem('user');
        this.router.navigate(['/admin', 'login']);
    }

    public register(email: string, password: string) {
        this.result = firebase.auth().createUserWithEmailAndPassword(email, password);
        this.sendEmailVerification();
    }

    public sendEmailVerification() {
        firebase.auth().currentUser.sendEmailVerification();
        this.router.navigate(['/admin', 'verify-email']);
    }

    public sendPasswordResetEmail(passwordResetEmail: string) {
        return firebase.auth().sendPasswordResetEmail(passwordResetEmail);
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    }
}
*/
