import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {
  Opp,
  OppService,
  Project,
  ProjectService,
  RequestService,
  Request,
  UserService,
 } from '../../sn-firebase';

export type ApplyPageSources = {
  opp$: Observable<Opp>,
  project$: Observable<Project>,
  request$: Observable<Request>,
};

@Injectable()
export class ApplyPageSourcesResolver implements Resolve<ApplyPageSources> {
    constructor(
      public opps: OppService,
      public projects: ProjectService,
      public requests: RequestService,
      public users: UserService,
    ) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<ApplyPageSources> {
      const opp$ = this.opps.byKey(route.params['oppKey']);
      const project$ = this.projects.byKey(route.params['projectKey']);
      const request$ = this.users.uid$
        .switchMap(uid => this.requests.byKey(uid + route.params['oppKey']));
      const sources = {
        opp$,
        project$,
        request$,
      };
      return Observable.combineLatest(opp$, project$, request$)
        .map(() => sources)
        .first();
    }
}
