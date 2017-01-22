import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApplyPageSources } from '../ApplyPageSources';

@Component({
  selector: 'apply',
  styleUrls: [ './index.css' ],
  template: `
<div fxLayout='column' fxFill>
  <app-bar></app-bar>
  <project-header [sources]='sources'></project-header>
  <apply-header [sources]='sources'></apply-header>
  <apply-wizard [sources]='sources' fxFlex></apply-wizard>
</div>
`
})
export class ApplyPageComponent {
  public sources: ApplyPageSources;

  constructor(
    public route: ActivatedRoute,
  ) {
    this.sources = route.snapshot.data['sources'];
  }

}
