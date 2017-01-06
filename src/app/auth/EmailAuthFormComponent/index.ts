import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'email-auth-form',
  template: `
<form fxLayout='column' [formGroup]='credForm' (ngSubmit)='submit()'>
<md-input-container>
    <input md-input formControlName='email' type='text' i18n-placeholder='Email Address|form label' placeholder='Email Address'>
</md-input-container>
<md-input-container>
    <input md-input formControlName='password' type='password' i18n-placeholder='Password|form label' placeholder='Password'>
</md-input-container>
<button type='button' (click)='click.emit()' md-raised-button color='primary'><ng-content></ng-content></button>
</form>
`
})
export class EmailAuthFormComponent implements OnInit {
    // @Output() public values: Observable<any>;
    @Output() public submit: EventEmitter<any> = new EventEmitter<any>();
    public click: EventEmitter<any> = new EventEmitter<any>();

    public credForm: FormGroup;

    constructor(public fb: FormBuilder) {}

    public ngOnInit() {
        this.credForm = this.fb.group({
            email: ['', [<any>Validators.required, ]],
            password: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
        });

        this.credForm.valueChanges
            .sample(this.click)
            .subscribe(creds => this.submit.emit(creds));
    }
}
