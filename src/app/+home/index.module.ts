import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SNFirebaseModule } from '../sn-firebase';

import { HomeComponent } from './HomeComponent';

export const routes = [
  {path: '', component: HomeComponent, },
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SNFirebaseModule,
  ],
  providers: [],
})
export class HomeModule { }
