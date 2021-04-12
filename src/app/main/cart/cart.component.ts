import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {CustomerData, Order, Product} from '../../shared/interfaces';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
    public products: Product[];
    public order: Order;
    public checkoutForm: FormGroup;
    public direction = false;
    public sortStr = 'category';
    public orderSub: Subscription;
    public errors = false;
    public id: string[];
    public uid: string = this.auth.userState.uid;
    private pSub: Subscription;

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder,
        private auth: AuthService
    ) {

        this.checkoutForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required]
        });
    }

    public ngOnInit(): void {
        this.pSub = this.cartService.getAllCartUser(this.auth.userState.uid).subscribe(products => {
            this.products = products;
            console.log(this.products);
        });
    }

    public onSubmit(customerData: CustomerData) {
        if (this.checkoutForm.invalid) {
            return;
        }
        this.order = {
            products: this.products.map(item => item.id),                     // *****
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            address: customerData.address,
            uid: this.uid
        };
        this.orderSub = this.cartService.saveOrder(this.order).subscribe(
            result => {
                console.log(result);
            },
            error => {
                console.log(error);
            },
            () => {
                this.cartService.clearCart(this.auth.userState.uid).subscribe();
                this.checkoutForm.reset();
            }
        );
    }

    public sort(sortName: string, direction: boolean): void {
        this.sortStr = sortName;
        this.direction = direction;
    }

    public remove(idx: number): void {
        this.id = this.products.map(item => item.id);
        this.cartService.deleteCartById(this.id[idx], this.auth.userState.uid).subscribe();
    }

    public ngOnDestroy() {
        if (this.orderSub) {
            this.orderSub.unsubscribe();
        }
        if (this.pSub) {
            this.pSub.unsubscribe();
        }
    }
}
