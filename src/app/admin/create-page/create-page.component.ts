import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/interfaces';
import {ProductsService} from '../shared/products.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }

    const product: Product = {
      title: this.form.value.title,
      category: this.form.value.category,
      text: this.form.value.text
    }

    this.productService.create(product).subscribe(() => {
      this.form.reset()
    })
  }

}
