import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  Opp,
  Request,
  RequestService,
  UserService,
 } from '../../sn-firebase';

import { ApplyPageSources } from '../ApplyPageSources';

@Component({
  selector: 'apply-pane-question',
  template: `
<div>
    <img [src]='(sources.ownerProfile_ | async)?.avatarImageUrl'/>
    <p>{{(sources.ownerProfile_ | async)?.displayName}}</p>
    <p>{{(sources.opp_ | async)?.question}}</p>
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
    @Input() public sources: ApplyPageSources;
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
    }

    public ngAfterViewInit() {
        this.canContinue$ = Observable.of(true);
    }
}
