import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../shared/products.service';
import {Product} from '../../shared/interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

    constructor(
        private productService: ProductsService,
        private route: ActivatedRoute
    ) {
    }

    productDataEdit: Product = {
        title: '',
        category: '',
        text: '',
        cost: ''
    };

    productSave: Product;

    ngOnInit() {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.productService.getById(params['id']);
            })
        ).subscribe((product: Product) => {
            this.productSave = product;
            this.productDataEdit = {
                title: product.title,
                category: product.category,
                text: product.text,
                cost: product.cost
            } as Product;
        });
    }

    submit() {
    }

    change(event) {
        this.productService.update({
            id: this.productSave.id,
            ...event
        }).subscribe();
    }


}
