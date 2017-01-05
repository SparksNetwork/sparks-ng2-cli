import { Component, Input, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'auth-frame',
  styleUrls: [ './index.css' ],
  template: `
<div fxLayout='column'>
    <h1>{{title}}</h1>
    <ng-content></ng-content>
</div>
`
})
export class AuthFrameComponent implements OnInit {
    @Input() title: string;

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
            if (user && redirectTo) {
                console.log('attempting nav to', redirectTo);
                this.router.navigate([redirectTo,]);
            }
            if (user && !redirectTo) {
                this.router.navigate(['/']);
            }
        });
    }
}

