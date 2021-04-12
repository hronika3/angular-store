import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from '../accountLogin/login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../Shared/services/auth.service';
import {SharedModule} from './shared/shared.module';
import {AuthGuard} from '../Shared/auth.guard';
import {SortPipe} from '../Shared/pipes/sort.pipe';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment, firebaseConfig} from '../../environments/environment';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        SortPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/login', pathMatch: 'full'},
                    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
                    {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
                    {path: 'Main/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
                ]
            }
        ])
    ],
    exports: [RouterModule, SortPipe],
    providers: [AuthService, AuthGuard]
})
export class AdminModule {
}
