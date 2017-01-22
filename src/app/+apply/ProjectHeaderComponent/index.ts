import { Component, Input } from '@angular/core';
import { ApplyPageSources } from '../ApplyPageSources';

@Component({
  selector: 'project-header',
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
export class ProjectHeaderComponent {
  @Input() public sources: ApplyPageSources;
}
