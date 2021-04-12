import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './main/home-page/home-page.component';
import {SharedModule} from './admin/shared/shared.module';
import {ProductPageComponent} from './main/product-page/product-page.component';
import {NgbAlertModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {CartComponent} from './main/cart/cart.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from './admin/admin.module';
import {RegisterPageComponent} from './accountLogin/register-page/register-page.component';
import {ProfilePageComponent} from './main/profile-page/profile-page.component';

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        HomePageComponent,
        ProductPageComponent,
        CartComponent,
        RegisterPageComponent,
        ProfilePageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        [NgbPaginationModule, NgbAlertModule],
        ReactiveFormsModule,
        AdminModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
