import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../interfaces';

@Pipe({
    name: 'sortProducts'
})
export class SortPipe implements PipeTransform {
    public transform(products: Product[], sortName: string = '', direction: boolean = true): Product[] {
        if (!sortName.trim()) {
            return products;
        }
        if (direction){
            return products;
        }
        return products;
    }
}
