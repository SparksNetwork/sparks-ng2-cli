import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';

import { environment } from '../../environments/environment';

@NgModule({
  providers: [
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
  ],
})
export class SNFirebaseModule { }
