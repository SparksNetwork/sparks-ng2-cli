import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: [
    './app.component.css'
  ],
  template: `<router-outlet></router-outlet>`,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
