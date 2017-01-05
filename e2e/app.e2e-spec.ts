import { SparksNg2CliPage } from './app.po';

describe('sparks-ng2-cli App', function() {
  let page: SparksNg2CliPage;

  beforeEach(() => {
    page = new SparksNg2CliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
