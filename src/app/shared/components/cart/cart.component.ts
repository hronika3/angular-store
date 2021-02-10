import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Order, Product} from '../../interfaces';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {Subscription, throwError} from 'rxjs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
    products: Product[];
    order: Order;
    checkoutForm: FormGroup;
    direction = false;
    sortStr = 'category';
    orderSub: Subscription;
    errors = false;

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder
    ) {
        this.products = this.cartService.getProducts();

        this.checkoutForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required]
        });
    }

    ngOnInit(): void {
    }

    onSubmit(customerData) {
        if (this.checkoutForm.invalid) {
            return;
        }
        this.order = {
            products: this.products.map(item => item.id),
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            address: customerData.address
        };
        this.orderSub = this.cartService.saveOrder(this.order).subscribe(
            result => {
                console.log(result);
            },
            error => {
                console.log(error);
            },
            () => {
                this.cartService.clearCart();
                this.checkoutForm.reset();
            }
        );
        console.log('test');
    }

    sort(sortName, direction) {
        this.sortStr = sortName;
        this.direction = direction;
    }

    remove(idx) {
        this.products.splice(idx, 1);
    }

    ngOnDestroy() {
        if (this.orderSub) {
            this.orderSub.unsubscribe();
        }
    }
}
