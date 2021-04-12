import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {EditFormComponent} from '../../Shared/components/edit-form/edit-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        HttpClientModule,
        EditFormComponent
    ],
    declarations: [EditFormComponent]
})

export class SharedModule {
}
