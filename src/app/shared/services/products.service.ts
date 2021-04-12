import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, Product} from '../interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ProductsService {

    constructor(private http: HttpClient) {
    }

    public create_product(product: Product): Observable<Product> {
        return this.http.post(`${environment.fbDbUrl}/products.json`, product)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...product, id: response.name
                };
            }));
    }

    public getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${environment.fbDbUrl}/products/${id}.json`)
            .pipe(map((products: Product) => {
                console.log(products);
                return {
                    ...products, id
                };
            }));
    }

    public getAllProducts(): Observable<Product[]> {
        return this.http.get(`${environment.fbDbUrl}/products.json`)
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

    public getProductByTitle(title: string): Observable<Product[]> {
        return this.getAllProducts().pipe(
            map((products) => {
                return products.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
            })
        );
    }

    public removeProduct(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/products/${id}.json`);
    }

    public updateProduct(product: Product): Observable<Product> {
        return this.http.patch<Product>(`${environment.fbDbUrl}/products/${product.id}.json`, product);
    }

}
