import {TestBed} from '@angular/core/testing';
import {CartService} from './cart.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Order} from '../interfaces';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

describe('CartService', () => {
    let httpTestingController: HttpTestingController;
    let service: CartService;
    const data: Order = {
        products: [1, 2],
        firstName: '1',
        lastName: '2',
        address: '3'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CartService],
            imports: [HttpClientTestingModule]
        });


        service = TestBed.inject(CartService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('can test HttpClient.post 1', () => {
        service.saveOrder(data).subscribe();
        const req = httpTestingController.expectOne(`${environment.fbDbUrl}/orders.json`);
        expect(req.request.method).toBe('POST');
        req.flush(data);
    });

    afterEach(() => httpTestingController.verify());
});
