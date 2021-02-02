import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../../../shared/interfaces';

@Pipe({
    name: 'sortProducts'
})
export class SortPipe implements PipeTransform {
    transform(products: Product[], sortName = ''): Product[] {
        if (!sortName.trim()) {
            return products;
        }
        return products.sort(this.byField(sortName));
    }

    byField(field) {
        if (field === 'cost') {
            return (a, b) => b[field] - a[field];
        }
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

}
