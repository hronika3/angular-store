import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, FbCreateResponse, LoginUser, User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import firebase from 'firebase';
import auth = firebase.auth;

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public error$: Subject<string> = new Subject<string>();
    userState: any;

    constructor(private http: HttpClient,
                public afs: AngularFirestore,
                public afAuth: AngularFireAuth,
                public router: Router,
                public ngZone: NgZone) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userState = user;
                localStorage.setItem('user', JSON.stringify(this.userState));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    get token(): string {
        const expDate = new Date(localStorage.getItem('fb-token-exp'));
        if (new Date() > expDate) {
            this.setToken(null);
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    login(user) {
        /*user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            );*/
        user.returnSecureToken = true;
        return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                console.log('result ', result);
                this.setToken({
                    idToken: result.user.uid,
                    expiresIn: '360'
                });
                this.ngZone.run(() => {
                    this.router.navigate(['/admin', 'dashboard']);
                });
                this.setUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    register(user: User) {
        return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                this.setUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    setUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userState: LoginUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: !user.emailVerified
        };
        console.log('userState', userRef);
        return userRef.set(userState, {
            merge: true
        });
    }

    logout() {
        this.setToken(null);
        this.afAuth.signOut().then(() => {
        });
    }

    GoogleAuth() {
        const googleAuth = new auth.GoogleAuthProvider();
        console.log(googleAuth);
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                this.setToken({
                    idToken: result.user.uid,
                    expiresIn: '360'
                });
                this.ngZone.run(() => {
                    this.router.navigate(['/admin', 'dashboard']);
                });
                this.setUserData(result.user);
            }).catch((error) => {
                window.alert(error);
            });
    }

    ForgotPassword(passwordResetEmail) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            }).catch((error) => {
                window.alert(error);
            });
    }

    SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u.sendEmailVerification())
            .then(() => {
                this.router.navigate(['email-verification']);
            });
    }

    isAuthenteticated(): boolean {
        return !!this.token;
    }

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Неверный email');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Данный email не найден');
                break;
            default:
                this.error$.next('Ошибка');
                break;
        }

        return throwError(error);
    }

    private setToken(response: FbAuthResponse | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }

    /*register(user: User): Observable<User> {
        return this.http.post(`${environment.fbDbUrl}/users.json`, user)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    id: response.name,
                    ...user
                };
            }));
    }*/
}
