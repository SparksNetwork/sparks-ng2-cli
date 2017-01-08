import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './AuthComponent';
import { AuthChildConnectComponent } from './AuthChildConnectComponent';
import { AuthChildSigninComponent } from './AuthChildSigninComponent';
import { AuthFrameComponent } from './AuthFrameComponent';
import { EmailAuthFormComponent } from './EmailAuthFormComponent';
import { GoogleAuthButtonComponent } from './GoogleAuthButtonComponent';
import { FacebookAuthButtonComponent } from './FacebookAuthButtonComponent';

export const routes = [
  {path: ':redirectTo', component: AuthComponent,
    children: [
      {path: '', redirectTo: './connect', pathMatch: 'full'},
      {path: 'connect', component: AuthChildConnectComponent, },
      {path: 'signin', component: AuthChildSigninComponent, },
    ],
  },
];

@NgModule({
  declarations: [
    AuthComponent,
    AuthChildConnectComponent,
    AuthChildSigninComponent,
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
