import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../shared/products.service';
import {Product} from '../../shared/interfaces';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    products: Product[] = [];
    pSub: Subscription;
    dSub: Subscription;
    searchStr = '';
    sortStr = '';
    constructor(private productService: ProductsService) {
    }

    remove(id: string) {
        this.dSub = this.productService.remove(id).subscribe(() => {
            this.products = this.products.filter(products => products.id !== id);
        });
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
        if (this.dSub) {
            this.dSub.unsubscribe();
        }
    }

}
