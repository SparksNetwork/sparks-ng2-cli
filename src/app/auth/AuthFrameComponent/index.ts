import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auth-frame',
  styleUrls: [ './index.css' ],
  template: `
<div fxLayout='column'>
    <h1>{{title}}</h1>
    <ng-content></ng-content>
</div>
`
})
export class AuthFrameComponent {
    @Input() title: string;
}

