import {Component, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../../shared/interfaces';
import {EventEmitter} from '@angular/core';

@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss']
})


export class EditFormComponent implements OnChanges {
    @Input() productData: Product;
    @Output() newItemEvent = new EventEmitter();

    form: FormGroup;

    constructor() {
    }

    ngOnChanges() {
        this.form = new FormGroup({
            title: new FormControl(this.productData.title, Validators.required),
            category: new FormControl(this.productData.category, Validators.required),
            text: new FormControl(this.productData.text, Validators.required),
            cost: new FormControl(this.productData.cost, Validators.required),
            image: new FormControl(this.productData.image, Validators.required)
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }
        const product: Product = {
            title: this.form.value.title,
            category: this.form.value.category,
            text: this.form.value.text,
            cost: this.form.value.cost,
            image: this.form.value.image
        };

        this.newItemEvent.emit(product);

        this.form.reset();
    }


}
