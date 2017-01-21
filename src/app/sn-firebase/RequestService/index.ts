import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

import { CollectionFakeServiceBase } from '../CollectionFakeServiceBase';
import { UserService } from '../UserService';

export enum RequestState {
    Active,
    Spent,
    Past,
};

export enum RequestIntent {
    Incomplete,
    Valid,
    Open,
    Closed,
};

export enum RequestResponse {
    Pending,
    Accepted,
    Declined,
};

export type Request = {
    oppKey?: string;
    ownerUid?: string;
    answer?: string;
    state?: RequestState;
    intent?: RequestIntent;
    response?: RequestResponse;
};

@Injectable()
export class RequestService extends CollectionFakeServiceBase<Request> {
    public firebasePath = '/Requests';

  constructor(public af: AngularFire) { super(af); }

  public actionUpdate(key: string, vals: Object) {
      this.byKey(key).emit(vals);
  }
}

@Injectable()
export class RequestByKeyResolver implements Resolve<Request> {
    constructor(public requests: RequestService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<Request> {
        return this.requests.byKey(route.params['requestKey']).first();
    }
}

@Injectable()
export class RequestByOppAndUserResolver implements Resolve<Request> {
    constructor(public requests: RequestService, public users: UserService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<Request> {
        return this.users.uid$
            .switchMap(uid => this.requests.byKey(`${uid}:${route.params['oppKey']}`))
            .first();
    }
}
