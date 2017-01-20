import { Injectable, EventEmitter } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

import { CollectionFakeServiceBase } from '../CollectionFakeServiceBase';
import { all, identity, props } from 'ramda';

import { UserService } from '../UserService';

export enum ProfileState {
    Incomplete,
    Complete,
}

export type Profile = {
    $key?: string;
    state?: ProfileState;
    legalName?: string;
    displayName?: string;
    superpower?: string;
    phoneNumber?: string;
    birthday?: string;
    zipCode?: string;
};

const REQUIRED_FIELDS = [
    'legalName',
    'displayName',
    'superpower',
    'phoneNumber',
    'birthday',
    'zipCode',
];

export function isProfileComplete(profile: Profile): boolean {
    return all(identity, props(REQUIRED_FIELDS, profile));
}

@Injectable()
export class ProfileService extends CollectionFakeServiceBase<Profile> {
    public firebasePath = '/Profiles';

    public ofUser: Observable<Profile>;

    constructor(public af: AngularFire, public userService: UserService) {
        super(af);

        this.ofUser = userService.uid$
            .switchMap(uid => uid ? this.byKey(uid) : Observable.of(null) );
    }

    public actionUpdate(key: string, vals: {}) {
        // fake for now
        if (isProfileComplete(vals)) { vals['state'] = ProfileState.Complete; };
        this.byKey(key).next(vals);
        localStorage.setItem(key, JSON.stringify(vals));
    }
}

