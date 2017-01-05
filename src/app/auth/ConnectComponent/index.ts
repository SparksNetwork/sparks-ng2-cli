import { Component } from '@angular/core';

@Component({
  selector: 'connect',
  template: `
<auth-frame i18n-title='Connect Title|frame title for connecting a new account' title='Connect to the Sparks.Network'>
  <google-auth-button
    i18n='Connect w Google|button title for connecting to google account'>
    Connect with Google
  </google-auth-button>
  <facebook-auth-button
    i18n='Connect w Facebook|button title for connecting to facebook account'>
    Connect with Facebook
  </facebook-auth-button>
  <email-auth-form i18n='Connect w email|button title for connecting with email address'>
    Connect with Email
  </email-auth-form>
  <a routerLink='../signin'
    i18n='Already have account|link to go to sign in with existing account'>
    Already have an account? Sign in.
  </a>
</auth-frame>
`
})
export class ConnectComponent {}
