import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {CartComponent} from './shared/components/cart/cart.component';
import {RegisterPageComponent} from './register-page/register-page.component';


const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {path: '', redirectTo: '/', pathMatch: 'full'},
            {path: '', component: HomePageComponent},
            {path: 'product/:id', component: ProductPageComponent},
            {path: 'cart', component: CartComponent},
            {path: 'register', component: RegisterPageComponent}
        ]
    },
    {
        path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        relativeLinkResolution: 'legacy'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
