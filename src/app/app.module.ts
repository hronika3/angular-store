import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {SharedModule} from './admin/shared/shared.module';
import {ProductPageComponent} from './product-page/product-page.component';
import {ProductComponent} from './shared/components/product/product.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {CartComponent} from './shared/components/cart/cart.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from './admin/admin.module';
import {CartMenuComponent} from './shared/components/cart-menu/cart-menu.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {RegisterFormComponent} from './shared/components/register-form/register-form.component';
import {TestLoginComponent} from './test-login/test-login.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        HomePageComponent,
        ProductPageComponent,
        ProductComponent,
        CartComponent,
        CartMenuComponent,
        RegisterPageComponent,
        RegisterFormComponent,
        TestLoginComponent,
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
