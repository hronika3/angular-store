import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ProductsService} from '../admin/shared/products.service';
import {CartService} from '../shared/services/cart.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../admin/shared/services/auth.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

    public products: Product[] = [];
    public pSub: Subscription;
    public dSub: Subscription;
    constructor(
        private productService: ProductsService,
        private route: ActivatedRoute,
        private cartService: CartService,
        public auth: AuthService
    ) {
    }

    public addToCart(product: Product) {
        this.cartService.addToCartUser(product, this.auth.userState.uid).subscribe();
    }

    public ngOnInit() {
        this.pSub = this.productService.getAll().subscribe(products => {
            this.products = products;
        });
    }

    public ngOnDestroy() {
        if (this.pSub) {
            this.pSub.unsubscribe();
        }
    }
}
