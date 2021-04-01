import {Injectable, NgZone} from '@angular/core';
import {FbAuthResponse, LoginUser, User} from '../../../shared/interfaces';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import auth = firebase.auth;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public error$: Subject<string> = new Subject<string>();
    public userState: LoginUser;

    constructor(public afs: AngularFirestore,
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

    public login(user: User): Promise<void> {
        user.returnSecureToken = true;
        return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                console.log('result ', result);
                this.setToken({
                    idToken: result.user.uid,
                    expiresIn: '36000'          // Время действия логина
                });
                this.ngZone.run(() => {
                    this.router.navigate(['/admin', 'dashboard']);
                });
                this.setUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
        /*user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            );*/
    }

    public register(user: User): Promise<void> {
        return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                this.setUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    public setUserData(user: LoginUser): Promise<void> {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userState: LoginUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: !user.emailVerified,
            roles: {
                user: true
            }
        };
        console.log('userState', userRef);
        return userRef.set(userState, {
            merge: true
        });
    }

    public logout(): void{
        this.setToken(null);
        this.afAuth.signOut().then(() => {
        });
    }

    public GoogleAuth(): Promise<void> {
        const googleAuth = new auth.GoogleAuthProvider();
        return this.AuthLogin(googleAuth);
    }

    public AuthLogin(provider: GoogleAuthProvider): Promise<void> {
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

    /*public ForgotPassword(passwordResetEmail) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            }).catch((error) => {
                window.alert(error);
            });
    }*/

    /*public SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u.sendEmailVerification())
            .then(() => {
                this.router.navigate(['email-verification']);
            });
    }*/

    public isAuthenteticated(): boolean {
        return !!this.token;
    }

    /*private handleError(error: HttpErrorResponse) {
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
    }*/

    private setToken(response: FbAuthResponse | null): void {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }
}
