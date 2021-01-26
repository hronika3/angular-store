import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from './admin/shared/shared.module';
import {ProductPageComponent} from './product-page/product-page.component';
import {ProductComponent} from './shared/components/product/product.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    ProductPageComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    [NgbPaginationModule, NgbAlertModule]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
