import { Component } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { MdSnackBar } from '@angular/material';

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
  <email-auth-form (submit)='emailAuthFormSubmit($event)'
    i18n='Connect w email|button title for connecting with email address'>
    Connect with Email
  </email-auth-form>
  <a routerLink='../signin'
    i18n='Already have account|link to go to sign in with existing account'>
    Already have an account? Sign in.
  </a>
</auth-frame>
`
})
export class ConnectComponent {
  constructor(public af: AngularFire, public snackBar: MdSnackBar) {}

  public emailAuthFormSubmit(creds) {
    // TODO: clean this up, also, i18n by putting snackbar content into angular templates
    this.af.auth.createUser(creds)
      .then(
        result => { this.snackBar.open('welcome to sparks.network!', 'sweet', {duration: 3000}); },
        err => {
          if (err['code'] = 'auth/email-already-in-use') {
            return this.af.auth.login(creds, {
              provider: AuthProviders.Password,
              method: AuthMethods.Password,
            }).then(
              result => { this.snackBar.open('welcome back!', 'sweet', {duration: 3000}); },
              () => this.snackBar.open(err.message, 'try again', {duration: 6000}),
            );
          }
          this.snackBar.open(err.message, 'try again', {duration: 6000});
        }
      );
  }
}
