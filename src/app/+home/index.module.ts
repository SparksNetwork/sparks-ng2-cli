import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SNFirebaseModule } from '../sn-firebase';
import { SDSModule } from '../sds';

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
    MaterialModule.forRoot(),
    FlexLayoutModule,
    SDSModule,
  ],
  providers: [],
})
export class HomeModule { }
