import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { SNFirebaseModule, OppsByKeyResolver } from '../sn-firebase';
import { ApplyComponent } from './ApplyComponent';
import { ApplyPaneAboutComponent } from './ApplyPaneAboutComponent';
import { ApplyPaneConfirmComponent } from './ApplyPaneConfirmComponent';
import { ApplyPaneQuestionComponent } from './ApplyPaneQuestionComponent';
import { ApplyPaneTeamsComponent } from './ApplyPaneTeamsComponent';

export const routes = [
  {path: ':projectKey/:oppKey', component: ApplyComponent,
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
  ],
  providers: [],
})
export class ApplyModule { }
