import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    const h1 = element(by.css('h1'));
    expect(h1.getText()).toContain('Home');
  });
});
