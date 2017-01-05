import { Component } from '@angular/core';

@Component({
  selector: 'email-auth-form',
  template: `
<form fxLayout='column'>
<md-input-container>
    <input md-input type='text' i18n-placeholder='Email Address|form label' placeholder='Email Address'>
</md-input-container>
<md-input-container>
    <input md-input type='password' i18n-placeholder='Password|form label' placeholder='Password'>
</md-input-container>
<button md-raised-button color='primary'><ng-content></ng-content></button>
</form>
`
})
export class EmailAuthFormComponent {}
