import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MdTabGroup } from '@angular/material';
import { prop } from 'ramda';

import {
  Opp,
  OppService,
  Project,
  ProjectService,
  RequestService,
  Request,
  UserService,
 } from '../../sn-firebase';

import { ApplyPaneAboutComponent } from '../ApplyPaneAboutComponent';
import { ApplyPaneQuestionComponent } from '../ApplyPaneQuestionComponent';
import { ApplyPaneTeamsComponent } from '../ApplyPaneTeamsComponent';
import { ApplyPaneConfirmComponent } from '../ApplyPaneConfirmComponent';

import { ApplyPageSources } from '../ApplyPageComponent';

@Component({
  selector: 'apply-wizard',
  styleUrls: [ './index.css' ],
  template: `
<div fxLayout='column' fxFill>
  <div fxFlex>
    <md-tab-group #tabs>
        <md-tab label='You' [disabled]='false'>
        <md-card style='margin: 16px; min-width: 340px;'>
            <apply-pane-about #paneAbout></apply-pane-about>
        </md-card>
        </md-tab>
        <md-tab label='Question' [disabled]='!(paneAbout.canContinue$ | async)'>
        <md-card style='margin: 16px; min-width: 340px;'>
            <apply-pane-question [opp]='opp_ | async' #paneQuestion></apply-pane-question>
        </md-card>
        </md-tab>
        <md-tab label='Teams' [disabled]='!(paneQuestion.canContinue$ | async)'>
        <md-card style='margin: 16px; min-width: 340px;'>
            <apply-pane-teams #paneTeams></apply-pane-teams>
        </md-card>
        </md-tab>
        <md-tab label='Confirm' [disabled]='!(paneTeams.canContinue$ | async)'>
        <md-card style='margin: 16px; min-width: 340px;'>
            <apply-pane-confirm #paneConfirm></apply-pane-confirm>
        </md-card>
        </md-tab>
    </md-tab-group>
  </div>
  <div fxLayout='column' fxLayoutAlign='start center' style='padding: 16px;'>
    <div [hidden]='(currentTabIndex$ | async) > 2'>
      <button md-raised-button color='primary'
        [disabled]='disableContinue$ | async' (click)='continue()'>Continue</button>
    </div>
    <div [hidden]='(currentTabIndex$ | async) <= 2'>
      <button md-raised-button color='primary'
        [disabled]='disableSubmit$ | async' (click)='submit()'>Send Request Now</button>
    </div>
  </div>
</div>
`
})
export class ApplyWizardComponent implements AfterViewInit {
    @Input() sources: ApplyPageSources;
    @Input() opp_: Observable<Opp>;
//   public opp$: Observable<Opp>;
  public project$: Observable<Project>;
  public request$: Observable<Request>;
  public currentTabIndex$: Observable<number>;
  public disableContinue$: Observable<boolean>;
  public disableSubmit$: Observable<boolean>;

  @ViewChild('tabs') public tabs: MdTabGroup;
  @ViewChild('paneAbout') public paneAbout: ApplyPaneAboutComponent;
  @ViewChild('paneQuestion') public paneQuestion: ApplyPaneQuestionComponent;
  @ViewChild('paneTeams') public paneTeams: ApplyPaneTeamsComponent;
  @ViewChild('paneConfirm') public paneConfirm: ApplyPaneConfirmComponent;

  constructor(
    public oppService: OppService,
    public projectService: ProjectService,
    public requestService: RequestService,
    public userService: UserService,
    public route: ActivatedRoute,
  ) {
    // this.opp$ = oppService.byKey(route.snapshot.params['oppKey']);
    this.project$ = projectService.byKey(route.snapshot.params['projectKey']);
    this.request$ = userService.uid$
      .switchMap(uid => requestService.byKey(uid + route.snapshot.params['oppKey']));
  }

  public ngAfterViewInit() {
    this.currentTabIndex$ = this.tabs.selectChange.map(prop('index')).startWith(0);
    this.disableContinue$ = Observable.combineLatest(
      this.currentTabIndex$,
      this.paneAbout.canContinue$,
      this.paneQuestion.canContinue$,
      this.paneTeams.canContinue$,
      (idx, ...panels) => !panels[idx]
    );
    this.disableSubmit$ = Observable.combineLatest(
      this.paneAbout.canContinue$,
      this.paneQuestion.canContinue$,
      this.paneTeams.canContinue$,
      (x, y, z) => !(x && y && z),
    );
  }

  public continue() {
    this.tabs.selectedIndex = this.tabs.selectedIndex + 1;
  }

  public submit() {
    console.log('switch Request.Intent to Open');
  }

}