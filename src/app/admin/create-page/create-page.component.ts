import {Component, OnInit} from '@angular/core';
import {Product} from '../../Shared/interfaces';
import {ProductsService} from '../../Shared/services/products.service';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})

export class CreatePageComponent implements OnInit {

    constructor(private productService: ProductsService) {
    }

    public productData: Product = {
        title: '',
        category: '',
        text: '',
        cost: '',
        image: ''
    };

    public ngOnInit() {

    }

    public change(event: Product): void {
        this.productService.create_product(event).subscribe();
    }

}
