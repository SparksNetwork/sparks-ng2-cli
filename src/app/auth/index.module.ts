import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { ConnectComponent } from './ConnectComponent';
import { SigninComponent } from './SigninComponent';
import { AuthFrameComponent } from './AuthFrameComponent';
import { EmailAuthFormComponent } from './EmailAuthFormComponent';
import { GoogleAuthButtonComponent } from './GoogleAuthButtonComponent';
import { FacebookAuthButtonComponent } from './FacebookAuthButtonComponent';

export const routes = [
  {path: '', redirectTo: 'connect', pathMatch: 'full'},
  {path: 'connect', component: ConnectComponent, },
  {path: 'signin', component: SigninComponent, },
];

@NgModule({
  declarations: [
    ConnectComponent,
    SigninComponent,
    AuthFrameComponent,
    EmailAuthFormComponent,
    GoogleAuthButtonComponent,
    FacebookAuthButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
  ],
  providers: [],
})
export class AuthModule { }
