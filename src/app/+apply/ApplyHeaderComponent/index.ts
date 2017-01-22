import { Component, Input } from '@angular/core';
import { ApplyPageSources } from '../ApplyPageSources';

@Component({
  selector: 'apply-header',
  template: `
  <div>
    Complete your request to join {{(sources.opp_ | async)?.name}}
  </div>
`
})
export class ApplyHeaderComponent {
  @Input() public sources: ApplyPageSources;
}
