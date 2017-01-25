import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

import { CollectionServiceBase } from '../CollectionServiceBase';

export type Project = {
    name: string;
    description: string;
    ownerUid: string;
};

@Injectable()
export class ProjectService extends CollectionServiceBase<Project> {
    public firebasePath = '/Projects';

  constructor(public af: AngularFire) { super(af); }
}

@Injectable()
export class ProjectsByKeyResolver implements Resolve<Project> {
    constructor(public projects: ProjectService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<Project> {
        return this.projects.byKey(route.params['projectKey']).first();
    }
}

