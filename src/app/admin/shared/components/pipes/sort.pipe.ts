import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../../../shared/interfaces';

@Pipe({
    name: 'sortProducts'
})
export class SortPipe implements PipeTransform {
    public transform(products: Product[], sortName: string = '', direction: boolean = true): Product[] {
        if (!sortName.trim()) {
            return products;
        }
        if (direction){
            return products/*.sort(this.byFieldDown(sortName))*/;
        }
        return products/*.sort(this.byFieldUp(sortName))*/;
    }

    /*public byFieldUp(field: string): (a: Product[], b: Product[]) => number {
        if (field === 'cost') {
            return (a, b) => b[field] - a[field];
        }
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    public byFieldDown(field: string): (a: Product[], b: Product[]) => number {
        if (field === 'cost') {
            return (a, b) => a[field] - b[field];
        }
        return (a, b) => a[field] < b[field] ? 1 : -1;
    }*/
}
