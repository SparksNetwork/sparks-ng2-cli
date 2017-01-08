import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { OppService } from '../../sn-firebase';

@Component({
  selector: 'home',
  styleUrls: [ './index.css' ],
  template: `
<h1 i18n='Home|A page title for the home page'>Home</h1>
<a *ngIf='!(af.auth | async)' [routerLink]='["auth", "/", "connect"]'>Connect</a>
<a href='#' *ngIf='af.auth | async' (click)='logout()'>Logout</a>
<h2>Projects</h2>
<ul>
<li *ngFor='let opp of opps | async'>
  {{opp.name}} | <a routerLink='/apply/{{opp.projectKey}}/{{opp.$key}}'>Start Applying</a>
</li>
</ul>
<span><pre>{{(af.auth | async | json) || 'No user'}}</pre></span>
`
})
export class HomeComponent {
  public opps: Observable<Array<Object>>;

  constructor(public af: AngularFire, public oppService: OppService ) {
    this.opps = oppService.all();
  }

  public logout() { this.af.auth.logout(); }
}
