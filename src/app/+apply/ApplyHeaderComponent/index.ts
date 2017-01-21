import { Component, Input } from '@angular/core';
import { ApplyPageSources } from '../ApplyPageComponent';

@Component({
  selector: 'apply-header',
  template: `
  <div fxLayout='row'>
    <img src=''/>
    <div fxFlex fxLayout='column'>
      <h1>{{(sources.project_ | async)?.name}}</h1>
      <h2>Date & Location</h2>
    </div>
  </div>
`
})
export class ApplyHeaderComponent {
  @Input() public sources: ApplyPageSources;
}
