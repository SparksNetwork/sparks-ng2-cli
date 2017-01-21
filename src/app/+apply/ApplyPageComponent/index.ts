import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import {
  Opp,
  OppService,
  Project,
  ProjectService,
  RequestService,
  Request,
  UserService,
 } from '../../sn-firebase';

@Component({
  selector: 'apply',
  styleUrls: [ './index.css' ],
  template: `
<div fxLayout='column' fxFill>
  <app-bar></app-bar>
  <div fxLayout='row'>
    <img src=''/>
    <div fxFlex fxLayout='column'>
      <h1>{{(project_ | async)?.name}}</h1>
      <h2>Date & Location</h2>
    </div>
  </div>
  <div>
    Complete your request to join {{(opp_ | async)?.name}}
  </div>
  <apply-wizard [opp_]='opp_' fxFlex></apply-wizard>
</div>
`
})
export class ApplyPageComponent {
  public opp_: Observable<Opp>;
  public project_: Observable<Project>;
  public request_: Observable<Request>;

  constructor(
    public oppService: OppService,
    public projectService: ProjectService,
    public requestService: RequestService,
    public userService: UserService,
    public route: ActivatedRoute,
  ) {
    this.opp_ = oppService.byKey(route.snapshot.params['oppKey']);
    this.project_ = projectService.byKey(route.snapshot.params['projectKey']);
    this.request_ = userService.uid$
      .switchMap(uid => requestService.byKey(uid + route.snapshot.params['oppKey']));
  }

}
