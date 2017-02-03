import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SNFirebaseModule } from '../sn-firebase';
import { SDSModule } from '../sds';

import { HomePageComponent } from './HomePageComponent';
import { HomePageSourcesResolver } from './HomePageSourcesResolver';

export const routes = [
  {path: '', component: HomePageComponent,
    resolve: {
      sources: HomePageSourcesResolver,
    }
  },
];

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SNFirebaseModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    SDSModule,
  ],
  providers: [
    HomePageSourcesResolver,
  ],
})
export class HomeModule { }
