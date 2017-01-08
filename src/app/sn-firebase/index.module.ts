import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';

import { environment } from '../../environments/environment';

import { OppService, OppsByKeyResolver } from './OppService';
import { ProjectService, ProjectsByKeyResolver } from './ProjectService';
import { ProfileService, } from './ProfileService';
import { RequestService, } from './RequestService';
import { UserService, } from './UserService';
import { RequireUserGuard } from './RequireUserGuard';

@NgModule({
  providers: [
    ProjectService,
    ProjectsByKeyResolver,
    ProfileService,
    OppService,
    OppsByKeyResolver,
    RequestService,
    UserService,
    RequireUserGuard,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
  ],
})
export class SNFirebaseModule { }
