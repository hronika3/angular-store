import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {Product} from '../../shared/interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

    public productDataEdit: Product = {
        title: '',
        category: '',
        text: '',
        cost: '',
        image: ''
    };
    public productSave: Product;

    constructor(
        private productService: ProductsService,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.productService.getProductById(params.id);
            })
        ).subscribe((product: Product) => {
            this.productSave = product;
            this.productDataEdit = {
                title: product.title,
                category: product.category,
                text: product.text,
                cost: product.cost,
                image: product.image
            } as Product;
            console.log(product.image);
        });
    }

    public change(event: Product) {
        this.productService.updateProduct({
            id: this.productSave.id,
            ...event
        }).subscribe();
    }

}
