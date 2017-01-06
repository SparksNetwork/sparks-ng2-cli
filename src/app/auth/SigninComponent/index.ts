import { Component } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'connect',
  template: `
<auth-frame i18n-title='' title='Sign in to the Sparks.Network'>
  <google-auth-button
    i18n='Sign in w Google|button title for signing in with google account'>
    Sign in with Google
  </google-auth-button>
  <facebook-auth-button
    i18n='Sign in w Facebook|button title for signing in with Facebook account'>
    Sign in with Facebook
  </facebook-auth-button>
  <email-auth-form (submit)='emailAuthFormSubmit($event)'
    i18n='Sign in w email|button title for signing in with email address'>
    Sign in with Email
  </email-auth-form>
  <a routerLink='../connect'
    i18n='Need account|link to go to create a new account'>
    Need an account? Connect.
  </a>
</auth-frame>
`
})
export class SigninComponent {
  constructor(public af: AngularFire, public snackBar: MdSnackBar) {}

  public emailAuthFormSubmit(creds) {
    this.af.auth.login(
      creds,
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }
    )
      .then(
        result => { this.snackBar.open('welcome back!', 'sweet', {duration: 3000}); },
        err => { this.snackBar.open(err.message, 'try again', {duration: 6000}); }
      );
  }
}
