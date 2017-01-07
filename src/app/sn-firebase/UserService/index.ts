import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { propOr } from 'ramda';

import { CollectionFakeServiceBase } from '../CollectionFakeServiceBase';

@Injectable()
export class UserService {
    public firebasePath = '/Projects';
    public uid$: Observable<string>;

  constructor(public af: AngularFire) {
      this.uid$ = af.auth.map(propOr(null, 'uid'));
  }

}


