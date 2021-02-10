import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../shared/products.service';
import {Product} from '../../shared/interfaces';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';


@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy, AfterViewChecked {

    @ViewChild('search', {static: true}) search: ElementRef<HTMLInputElement>;

    searchStr = '';
    products: Product[] = [];
    pSub: Subscription;
    dSub: Subscription;
    sSub: Subscription;
    direction = false;
    sortStr = 'category';

    constructor(private productService: ProductsService) {
    }

    sort(sortName, direction) {
        this.sortStr = sortName;
        this.direction = direction;
    }

    ngAfterViewChecked() {
        if (!this.sSub) {
            this.sSub = fromEvent(this.search.nativeElement, 'keyup')
                .pipe(
                    filter(Boolean),
                    debounceTime(150),
                    distinctUntilChanged(),
                    tap(async (event: KeyboardEvent) => {
                        console.log(`value is ${this.search.nativeElement.value}`);
                        this.pSub = this.productService.getByTitle(this.searchStr).subscribe(products => {
                            this.products = products;
                        });
                    })
                )
                .subscribe();
        }
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
        if (this.sSub) {
            this.sSub.unsubscribe();
        }
    }

}
