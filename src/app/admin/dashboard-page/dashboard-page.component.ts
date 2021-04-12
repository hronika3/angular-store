import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {Product} from '../../shared/interfaces';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy, AfterViewChecked {

    @ViewChild('search', {static: true}) public search: ElementRef<HTMLInputElement>;

    public searchStr: string = '';
    public products: Product[] = [];
    public pSub: Subscription;
    public dSub: Subscription;
    public sSub: Subscription;
    public direction: boolean = false;
    public sortStr: string = 'category';

    constructor(private productService: ProductsService) {
    }

    public sort(sortName: string, direction: boolean): void {
        this.sortStr = sortName;
        this.direction = direction;
    }

    public ngAfterViewChecked() {
        if (!this.sSub) {
            this.sSub = fromEvent(this.search.nativeElement, 'keyup')
                .pipe(
                    filter(Boolean),
                    debounceTime(150),
                    distinctUntilChanged(),
                    tap(async () => {
                        console.log(`value is ${this.search.nativeElement.value}`);
                        this.pSub = this.productService.getProductByTitle(this.searchStr).subscribe(products => {
                            this.products = products;
                        });
                    })
                )
                .subscribe();
        }
    }

    public remove(id: string): void{
        this.dSub = this.productService.removeProduct(id).subscribe(() => {
            this.products = this.products.filter(products => products.id !== id);
        });
    }

    public ngOnInit() {
        this.pSub = this.productService.getAllProducts().subscribe(products => {
            this.products = products;
        });
    }

    public ngOnDestroy() {
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
