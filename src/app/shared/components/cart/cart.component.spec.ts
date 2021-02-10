import {TestBed} from '@angular/core/testing';

import {CartComponent} from './cart.component';
import {CartService} from '../../services/cart.service';
import {FormBuilder, Validators} from '@angular/forms';
import {EMPTY, Observable, throwError} from 'rxjs';

describe('CartComponent', () => {
    let service: CartService;
    let component: CartComponent;
    const order = {
        products: [1, 2],
        firstName: '1',
        lastName: '2',
        address: '3'
    };
    const customerData = {
        firstName: 'testFName',
        lastName: 'testLName',
        address: 'testAddress'
    };
    const product = {
        title: 'string',
        category: 'string',
        text: 'string',
        cost: 'string',
        image: 'string'
    };
    const mockCartService = {} as CartService;
    mockCartService.saveOrder = () => {
        return EMPTY;
    };

    beforeEach(() => {
        service = new CartService(null);
        component = new CartComponent(mockCartService, new FormBuilder());
        component.checkoutForm.patchValue({
            firstName: 'testFName',
            lastName: 'testLName',
            address: 'testAddress'
        });
    });

    it('should create form  ', () => {
        expect(component.checkoutForm.contains('firstName')).toBeTruthy();
        expect(component.checkoutForm.contains('lastName')).toBeTruthy();
        expect(component.checkoutForm.contains('address')).toBeTruthy();
    });

    it('should call saveOrder', () => {
        const spy = spyOn(mockCartService, 'saveOrder').and.returnValue(EMPTY);
        component.onSubmit(customerData);
        expect(spy).toHaveBeenCalled();
    });

    it('should clear order', () => {
        service.addToCart(product);
        component.remove(0);
        expect(service.getProducts.length).toBeFalsy();
    });

    it('should call reset', () => {
        component.onSubmit(customerData);
        expect(component.checkoutForm.get('firstName').value).toBe(null);
    });

    it('should not clear form', () => {
        const message = 'error';
        spyOn(mockCartService, 'saveOrder').and.returnValue(throwError(message));
        component.onSubmit(customerData);
        expect(component.checkoutForm.get('firstName').value).toBe('testFName');
    });
});
//debug, testBed, git, brouser
