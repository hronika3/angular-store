import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../../../shared/interfaces';

@Pipe({
    name: 'sortProducts'
})
export class SortPipe implements PipeTransform {
    transform(products: Product[], sortName = '', direction = true): Product[] {
        if (!sortName.trim()) {
            return products;
        }
        if (direction){
            return products.sort(this.byFieldDown(sortName));
        }
        return products.sort(this.byFieldUp(sortName));
    }

    byFieldUp(field) {
        if (field === 'cost') {
            return (a, b) => b[field] - a[field];
        }
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    byFieldDown(field) {
        if (field === 'cost') {
            return (a, b) => a[field] - b[field];
        }
        return (a, b) => a[field] < b[field] ? 1 : -1;
    }

}
