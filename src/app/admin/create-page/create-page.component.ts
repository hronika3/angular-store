import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/interfaces';
import {ProductsService} from '../shared/products.service';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})


export class CreatePageComponent implements OnInit {

    constructor(private productService: ProductsService) {
    }

    productData: Product = {
        title: '',
        category: '',
        text: '',
        cost: ''
    };

    ngOnInit() {

    }

    change(event) {
        this.productService.create(event).subscribe();
    }


}
/*
Input с фильтрацией, таблицами и всеми результатами.
ShoppingCard
Внешний вид
*/

