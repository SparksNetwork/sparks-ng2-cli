import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RequireUserResolver implements CanActivate {
  constructor(public af: AngularFire, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.af.auth
      .map(auth => auth ? true : false)
      .do(isUser => {
        if (!isUser) {
          this.router.navigate(['/auth', state.url]);
        }
      })
      .first();
  }
}
