import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
    selector: 'facebook-auth-button',
    styles: [
        'button { background-color: #3b5998 !important; color: white;}'
    ],
    template: `
<button md-raised-button (click)="onClick()">
    <ng-content></ng-content>
</button>
`,
})
export class FacebookAuthButtonComponent {
    constructor(public af: AngularFire) {}

    public onClick() {
        this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Redirect,
        });
    }
}
