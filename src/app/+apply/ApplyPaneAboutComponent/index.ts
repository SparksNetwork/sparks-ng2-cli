import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProfileService, UserService, isProfileComplete } from '../../sn-firebase';

@Component({
  selector: 'apply-pane-about',
  template: `
<form fxLayout='column' [formGroup]='form'>
    <md-input-container>
        <textarea md-input #superpower formControlName='superpower' type='text' maxlength='160'
            i18n-placeholder='What is your supowerpower?|form label' placeholder='What is your supowerpower?'>
        </textarea>
        <md-hint align='end'>{{superpower.value.length}} / 160</md-hint>
    </md-input-container>
    <md-input-container>
        <input md-input formControlName='legalName' type='text'
            i18n-placeholder='Legal Name|form label' placeholder='Legal Name'>
    </md-input-container>
    <md-input-container>
        <input md-input formControlName='displayName' type='text'
            i18n-placeholder='Preferred Name|form label' placeholder='Preferred Name'>
    </md-input-container>
    <md-input-container>
        <input md-input formControlName='phoneNumber' type='tel'
            i18n-placeholder='Phone Number|form label' placeholder='Phone Number'>
    </md-input-container>
    <md-input-container>
        <input md-input formControlName='birthday' type='date'
            i18n-placeholder='Birthday|form label' placeholder='Birthday'>
    </md-input-container>
    <md-input-container>
        <input md-input formControlName='zipCode' type='text'
            i18n-placeholder='ZIP Code|form label' placeholder='ZIP Code'>
    </md-input-container>
</form>
`
})
export class ApplyPaneAboutComponent implements OnInit, AfterViewInit {
    public form: FormGroup;
    public canContinue$: Observable<boolean>;

    constructor(
        public fb: FormBuilder,
        public profileService: ProfileService,
        public userService: UserService
    ) {}

    public ngOnInit() {
        this.form = this.fb.group({
            superpower: [null, [<any>Validators.required, ]],
            phoneNumber: ['', [<any>Validators.required, ]],
            legalName: ['', [<any>Validators.required, ]],
            displayName: ['', [<any>Validators.required, ]],
            birthday: ['', [<any>Validators.required, ]],
            zipCode: ['', [<any>Validators.required, ]],
        });

        this.profileService.ofUser.first().subscribe(user => {
            console.log('profileservice.ofUser initial form');
            this.form = this.fb.group({
                superpower: [user.superpower, [<any>Validators.required, ]],
                phoneNumber: ['', [<any>Validators.required, ]],
                legalName: ['', [<any>Validators.required, ]],
                displayName: ['', [<any>Validators.required, ]],
                birthday: ['', [<any>Validators.required, ]],
                zipCode: ['', [<any>Validators.required, ]],
            });
        });
    }

    public ngAfterViewInit() {
        const formUpdate$ = Observable.from(this.form.valueChanges)
            .debounceTime(1000);

        Observable.combineLatest(this.userService.uid$, formUpdate$)
            .subscribe(args => this.profileService.actionUpdate(args[0], args[1]));

        this.canContinue$ = this.profileService.ofUser.map(isProfileComplete).startWith(false);

        // this.profileService.ofUser.subscribe(user => {
        //     console.log('profileservice.ofUser change to form');
        //     // this.form.patchValue(user);
        //     this.form.controls['superpower']. = user.superpower; //  .setValue(user.superpower);
        // });
        // console.log('subscribed to profileService.ofUser with form created')
    }
}
