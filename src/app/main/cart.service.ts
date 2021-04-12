import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {FbCreateResponse, Order, Product} from '../shared/interfaces';
import {Observable, throwError} from 'rxjs';
import {preprocessDirectives} from 'tslint/lib/verify/parse';

@Injectable({providedIn: 'root'})

export class CartService {
    public products: Product[] = [];

    constructor(
        private http: HttpClient
    ) {
    }

    /*public addToCart(Main: Product) {
        this.products.push(Main);
        console.log(this.getProducts());
    }*/

    public addToCartUser(product: Product, uid: string): Observable<Product> {
        return this.http.post(`${environment.fbDbUrl}/cart/${uid}.json`, product)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...product, cartId: response.name
                };
            }), catchError(err => {
                console.log(err);
                return throwError(err);
            }));
    }

    public getAllCartUser(uid: string) {
        return this.http.get(`${environment.fbDbUrl}/cart/${uid}.json`)
            .pipe(map((response: { [key: string]: any }) => {
                return Object
                    .keys(response)
                    .map(key => {
                        return key;
                    })
                    .map(key => (
                        {
                            ...response[key],
                            id: key
                        }));
            }));
    }

    public deleteCartById(id: string, uid: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/cart/${uid}/${id}.json`);
    }

    /*public getProducts(): Product[] {
        return this.products;
    }*/

    public clearCart(uid: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/cart/${uid}.json`);
    }

    public saveOrder(order: Order): Observable<Order> {
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
