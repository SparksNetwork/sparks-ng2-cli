import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app',
  styleUrls: [
    './app.component.css'
  ],
  template: `<router-outlet></router-outlet>`,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(public af: AngularFire) {
    window['auth'] = af.auth; // allows tests to programmatically clear auth state, deleteAllCookies aint cuttin it
  }
}
