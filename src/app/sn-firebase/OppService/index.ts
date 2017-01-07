import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/operator/first';

import { CollectionServiceBase } from '../CollectionServiceBase';

export type Opp = {
    name: string;
    description: string;
    projectKey: string;
};

@Injectable()
export class OppService extends CollectionServiceBase<Opp> {
    public firebasePath = '/Opps';

    constructor(public af: AngularFire) { super(af); }

    public byProjectKey(equalTo: string) {
        return this.byChildKey('projectKey', equalTo);
    }
}

@Injectable()
export class OppsByKeyResolver implements Resolve<Opp> {
    constructor(public opps: OppService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<Opp> {
        const opp = this.opps.byKey(route.params['oppKey']);
        return this.opps.byKey(route.params['oppKey']).first();
    }
}


