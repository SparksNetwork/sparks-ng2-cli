import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  Opp,
  Request,
  RequestService,
  UserService,
 } from '../../sn-firebase';

@Component({
  selector: 'apply-pane-question',
  template: `
<div>
    <img/>
    <p>{{opp?.question}}</p>
</div>
<form fxLayout='column' [formGroup]='form'>
    <md-input-container>
        <textarea md-input #answer formControlName='answer' type='text' maxlength='160' rows='4'
            i18n-placeholder='Answer the question|form label' placeholder='Answer the question'>
        </textarea>
        <md-hint align='end'>{{answer.value.length}} / 160</md-hint>
    </md-input-container>
</form>
`
})
export class ApplyPaneQuestionComponent implements OnInit, AfterViewInit {
    @Input() public opp: Opp;
    public form: FormGroup;
    public canContinue$: Observable<boolean>;

    constructor(
        public fb: FormBuilder,
        public requestService: RequestService,
        public userService: UserService,
    ) {}

    public ngOnInit() {
        this.form = this.fb.group({
            answer: ['', [<any>Validators.required, ]],
        });

        // this.userService.uid$
        //     .switchMap(uid => Observable.from<Request>(this.requestService.byKey(`${uid}:${this.opp.$key}`)))
        //     .subscribe(req => {
        //         this.form['answer'].setValue(req.answer);
        //     });


        // this.requestService.byKey().first().subscribe(user => {
        //     this.form.setValue(pickEditFields(user));
        // });
    }

    public ngAfterViewInit() {
        this.canContinue$ = Observable.of(true);
    }
}
