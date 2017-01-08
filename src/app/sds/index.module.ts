import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { SNFirebaseModule } from '../sn-firebase';

import { AppBarComponent } from './AppBarComponent';

@NgModule({
  declarations: [
    AppBarComponent,
  ],
  imports: [
    CommonModule,
    SNFirebaseModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [
      AppBarComponent,
  ],
  providers: [],
})
export class SDSModule { }
