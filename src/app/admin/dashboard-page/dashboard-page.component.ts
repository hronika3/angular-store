import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../shared/products.service';
import {Product} from '../../shared/interfaces';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  products: Product[] = []
  pSub: Subscription

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getAll().subscribe( products => {
      this.products = products
    })
  }

  ngOnDestroy() {
    if(this.pSub){
      this.pSub.unsubscribe()
    }
  }
}
