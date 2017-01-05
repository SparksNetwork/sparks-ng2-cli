import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
    selector: 'google-auth-button',
    styles: [
        'button { background-color: #fff !important; color: black;}'
    ],
    template: `
<button md-raised-button (click)="onClick()">
    <ng-content></ng-content>
</button>
`,
})
export class GoogleAuthButtonComponent {
    constructor(public af: AngularFire) {}

    public onClick() {
        this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Redirect,
        });
    }
}
