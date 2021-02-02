import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, Product} from '../../shared/interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ProductsService {
    constructor(private http: HttpClient) {
    }

    create(product: Product): Observable<Product> {
        return this.http.post(`${environment.fbDbUrl}/products.json`, product)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...product,
                    id: response.name
                };
            }));
    }

    getAll(): Observable<Product[]> {

            return this.http.get(`${environment.fbDbUrl}/products.json`)
                .pipe(map((response: { [key: string]: any }) => {
                    return Object
                        .keys(response)
                        .map(key => ({
                            ...response[key],
                            id: key
                        }));
                }));

    }

    searchStr(): Observable<Product[]> {
        return this.http.get(`${environment.fbDbUrl}/products.json`)
            .pipe(map((response: { [key: string]: any }) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key
                    }));
            }));
    }

    getById(id: string): Observable<Product> {
        return this.http.get<Product>(`${environment.fbDbUrl}/products/${id}.json`)
            .pipe(map((products: Product) => {
                return {
                    ...products, id
                };
            }));
    }

    remove(id): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/products/${id}.json`);
    }

    update(product: Product): Observable<Product> {
        return this.http.patch<Product>(`${environment.fbDbUrl}/products/${product.id}.json`, product);
    }


}
