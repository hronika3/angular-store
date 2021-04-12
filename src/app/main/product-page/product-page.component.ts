import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Product} from '../../shared/interfaces';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

    constructor(
        private productService: ProductsService,
        private route: ActivatedRoute,
        public auth: AuthService
    ) {
    }

    public productData: Product;

    public ngOnInit() {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.productService.getProductById(params.id);
            })
        ).subscribe((product: Product) => {
            this.productData = product;
        });
    }

    public submit() {
    }
}
