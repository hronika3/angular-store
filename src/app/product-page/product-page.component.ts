import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../admin/shared/products.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Product} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor(
      private productService: ProductsService,
      private route: ActivatedRoute
  ) { }

  productData: Product

  productSave: Product

  ngOnInit() {
    this.route.params.pipe(
        switchMap((params: Params) => {
          return this.productService.getById(params['id'])
        })
    ).subscribe((product: Product) => {
      this.productSave = product
      console.log('1 ', this.productSave);
      this.productData.title = product.title
      this.productData.category = product.category
      this.productData.text = product.text
      console.log('2 ', this.productData.title);
    })
  }

  submit() {
  }
}
