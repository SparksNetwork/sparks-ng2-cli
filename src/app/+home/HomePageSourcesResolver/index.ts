import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {
  Opp,
  OppService,
 } from '../../sn-firebase';

export type HomePageSources = {
  opps$: Observable<Opp>,
};

@Injectable()
export class HomePageSourcesResolver implements Resolve<HomePageSources> {
    constructor(
      public opps: OppService,
    ) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<HomePageSources> {
      const opps$ = this.opps.all();
      const sources = {
        opps$,
      };
      return opps$
        .map(() => sources)
        .first();
    }
}
