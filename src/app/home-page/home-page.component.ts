import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ProductsService} from '../admin/shared/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  products: Product[] = []
  pSub: Subscription
  dSub: Subscription

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.pSub = this.productService.getAll().subscribe( products => {
      this.products = products
    })
  }

  ngOnDestroy() {
    if(this.pSub){
      this.pSub.unsubscribe()
    }
  }
}
