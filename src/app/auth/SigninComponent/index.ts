import { Component } from '@angular/core';

@Component({
  selector: 'connect',
  template: `
<auth-frame i18n-title='' title='Sign in to the Sparks.Network'>
  <google-auth-button
    i18n='Sign in w Google|button title for signing in with google account'
    >
    Sign in with Google
  </google-auth-button>
  <facebook-auth-button
    i18n='Sign in w Facebook|button title for signing in with Facebook account'
    >
    Sign in with Facebook
  </facebook-auth-button>
  <email-auth-form i18n='Sign in w email|button title for signing in with email address'>
    Sign in with Email
  </email-auth-form>
  <a routerLink='../connect'
    i18n='Need account|link to go to create a new account'
    >
    Need an account? Connect.
  </a>
</auth-frame>
`
})
export class SigninComponent {}
