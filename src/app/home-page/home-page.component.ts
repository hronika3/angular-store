import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ProductsService} from '../admin/shared/products.service';
import {CartService} from '../shared/services/cart.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

    products: Product[] = [];
    pSub: Subscription;
    dSub: Subscription;

    constructor(
        private productService: ProductsService,
        private route: ActivatedRoute,
        private cartService: CartService
    ) {
    }

    addToCart(product) {
        this.cartService.addToCart(product);
    }

    ngOnInit() {
        this.pSub = this.productService.getAll().subscribe(products => {
            this.products = products;
        });
    }

    ngOnDestroy() {
        if (this.pSub) {
            this.pSub.unsubscribe();
        }
    }
}
