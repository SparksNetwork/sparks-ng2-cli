import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { SNFirebaseModule, OppsByKeyResolver, RequireUserGuard } from '../sn-firebase';
import { SDSModule } from '../sds';

import { ApplyComponent } from './ApplyComponent';
import { ApplyPaneAboutComponent } from './ApplyPaneAboutComponent';
import { ApplyPaneConfirmComponent } from './ApplyPaneConfirmComponent';
import { ApplyPaneQuestionComponent } from './ApplyPaneQuestionComponent';
import { ApplyPaneTeamsComponent } from './ApplyPaneTeamsComponent';

export const routes = [
  {path: ':projectKey/:oppKey', component: ApplyComponent,
    canActivate: [
      RequireUserGuard,
    ],
    resolve: {
      opp: OppsByKeyResolver,
    },
  },
];

@NgModule({
  declarations: [
    ApplyComponent,
    ApplyPaneAboutComponent,
    ApplyPaneConfirmComponent,
    ApplyPaneQuestionComponent,
    ApplyPaneTeamsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SNFirebaseModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
    ReactiveFormsModule,
    SDSModule,
  ],
  providers: [],
})
export class ApplyModule { }
