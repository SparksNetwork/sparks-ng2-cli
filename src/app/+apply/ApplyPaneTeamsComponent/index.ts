import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MdCheckbox } from '@angular/material';
import { Observable } from 'rxjs';
import { prop } from 'ramda';

@Component({
  selector: 'apply-pane-teams',
  template: `
<md-checkbox #done>This is done</md-checkbox>
`
})
export class ApplyPaneTeamsComponent implements AfterViewInit {
    public canContinue$: Observable<boolean>;

    @ViewChild('done') done: MdCheckbox;

    constructor() {}

    public ngAfterViewInit() {
        this.canContinue$ = Observable.from(this.done.change).map(prop('checked')).startWith(false);
    }
}
