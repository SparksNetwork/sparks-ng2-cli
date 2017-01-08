import { Component, Input, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'auth',
//   styleUrls: [ './index.css' ],
  template: `
  Here
<router-outlet></router-outlet>
`
})
export class AuthComponent implements OnInit {
    constructor (
        public af: AngularFire,
        public router: Router,
        public route: ActivatedRoute,
    ) {}

    public ngOnInit() {
        const redirectTo$: Observable<string> =
            Observable.from(this.route.params)
                .map(params => params['redirectTo']);

        Observable.combineLatest(
            redirectTo$,
            this.af.auth,
        ).subscribe(([redirectTo, user]) => {
            if (user) { this.router.navigate([redirectTo || '/', ]); }
        });
    }
}

