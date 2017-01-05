import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'home',
  styleUrls: [ './index.css' ],
  template: `
<h1 i18n='Home|A page title for the home page'>Home</h1>
<a routerLink='/auth/connect'>Connect</a>
|
<a routerLink='/auth/signin'>Signin</a>
|
<a href='#' *ngIf='af.auth | async' (click)='logout()'>Logout</a>
|
<span><pre>{{(af.auth | async | json) || 'No user'}}</pre></span>
`
})
export class HomeComponent {
  constructor(public af: AngularFire) {}

  public logout() { this.af.auth.logout(); }
}
