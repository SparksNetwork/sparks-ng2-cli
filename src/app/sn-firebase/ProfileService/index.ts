import { Injectable, EventEmitter } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

import { CollectionFakeServiceBase } from '../CollectionFakeServiceBase';
import { all } from 'ramda';

export enum ProfileState {
    Incomplete,
    Complete,
}

export type Profile = {
    $key?: string;
    name?: string;
    state?: ProfileState;
    description?: string;
    phoneNumber?: string;
};

export function isProfileComplete(profile: Profile): boolean {
    return Boolean(profile.name && profile.description && profile.phoneNumber);
}

@Injectable()
export class ProfileService extends CollectionFakeServiceBase<Profile> {
    public firebasePath = '/Profiles';

    // fake for now
    // public ofUser: EventEmitter<Profile>;
    public ofUser: Observable<Profile>;

  constructor(public af: AngularFire) {
    super(af);

    // fake for now
    this.ofUser = Observable.from(this.af.auth)
        .do(auth => console.log('auth', auth))
        .switchMap(auth => this.byKey(auth.uid));

    // this.ofUser = Observable.from(this.af.auth)
    //     .switchMap(auth => auth && this.byKey(auth.uid) || Observable.of(null));
  }

  public actionUpdate(key: string, vals: Profile) {
      // fake for now
      this.byKey(key).emit(vals);
  }
}

