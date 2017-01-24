import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { SNFirebaseModule, RequireUserGuard } from '../sn-firebase';
import { SDSModule } from '../sds';

import { ApplyPageComponent } from './ApplyPageComponent';
import { ApplyHeaderComponent } from './ApplyHeaderComponent';
import { ApplyPaneAboutComponent } from './ApplyPaneAboutComponent';
import { ApplyPaneConfirmComponent } from './ApplyPaneConfirmComponent';
import { ApplyPaneQuestionComponent } from './ApplyPaneQuestionComponent';
import { ApplyPaneTeamsComponent } from './ApplyPaneTeamsComponent';
import { ApplyWizardComponent } from './ApplyWizardComponent';
import { ProjectHeaderComponent } from './ProjectHeaderComponent';

import { ApplyPageSourcesResolver } from './ApplyPageSources';

export const routes = [
  {path: ':projectKey/:oppKey', component: ApplyPageComponent,
    canActivate: [
      RequireUserGuard,
    ],
    resolve: {
      sources: ApplyPageSourcesResolver,
    },
  },
];

@NgModule({
  declarations: [
    ApplyPageComponent,
    ApplyHeaderComponent,
    ApplyPaneAboutComponent,
    ApplyPaneConfirmComponent,
    ApplyPaneQuestionComponent,
    ApplyPaneTeamsComponent,
    ApplyWizardComponent,
    ProjectHeaderComponent,
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
  providers: [
    ApplyPageSourcesResolver,
  ],
})
export class ApplyModule { }
