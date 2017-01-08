import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-bar',
//   styleUrls: [ './index.css' ],
  template: `
<md-toolbar>
  <a fxFlex routerLink='/'>sparks.network</a>
  <a *ngIf='!(af.auth | async)' [routerLink]='["auth", "/", "connect"]'>Connect</a>
  <a href='#' *ngIf='af.auth | async' (click)='logout()'>Logout</a>
</md-toolbar>
`
})
export class AppBarComponent {
  constructor(public af: AngularFire) {}

  public logout() { this.af.auth.logout(); }
}
