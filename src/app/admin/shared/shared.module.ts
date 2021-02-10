import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {EditFormComponent} from './components/edit-form/edit-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot(),
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        HttpClientModule,
        QuillModule,
        EditFormComponent
    ],
    declarations: [EditFormComponent]
})

export class SharedModule {
}
