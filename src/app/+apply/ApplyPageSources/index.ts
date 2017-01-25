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
  Profile,
  ProfileService,
 } from '../../sn-firebase';

export type ApplyPageSources = {
  opp_: Observable<Opp>,
  project_: Observable<Project>,
  request_: Observable<Request>,
  ownerProfile_: Observable<Profile>,
};

@Injectable()
export class ApplyPageSourcesResolver implements Resolve<ApplyPageSources> {
    constructor(
      public opps: OppService,
      public projects: ProjectService,
      public requests: RequestService,
      public users: UserService,
      public profiles: ProfileService,
    ) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<ApplyPageSources> {
      const opp_ = this.opps.byKey(route.params['oppKey']);
      const project_ = this.projects.byKey(route.params['projectKey']);
      const request_ = this.users.uid$
        .switchMap(uid => this.requests.byKey(uid + route.params['oppKey']));
      const ownerProfile_ = project_
        .switchMap(project => this.profiles.byKey(project.ownerUid));

      const sources = {
        opp_,
        project_,
        request_,
        ownerProfile_,
      };

      return Observable.combineLatest(opp_, project_, request_, ownerProfile_)
        .map(() => sources)
        .first();
    }
}
