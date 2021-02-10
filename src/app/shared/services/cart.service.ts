import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {FbCreateResponse, Order} from '../interfaces';
import {Observable, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})

export class CartService {
    constructor(
        private http: HttpClient
    ) {
    }

    products = [];

    addToCart(product) {
        this.products.push(product);
        console.log(this.getProducts());
    }

    getProducts() {
        return this.products;
    }

    clearCart() {
        this.products = [];
        return this.products;
    }

    saveOrder(order: Order): Observable<Order> {
        return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...order,
                    id: response.name
                };
            }), catchError(err => {
                console.log(err);
                return throwError(err);
            }));
    }

}

// /orders.json
