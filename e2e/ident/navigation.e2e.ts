import { browser, element, by, ExpectedConditions } from 'protractor';

import { logoutFirebase } from '../shared';

describe('UAT0, 0.1, 4: can see connect and sign in pages', () => {

  beforeEach(done => {
    logoutFirebase(browser)
      .then(res => done());
  });

  it('shows a connect page', () => {
    browser.get('/auth/connect');
    const h1 = element(by.css('h1'));
    expect(h1.getText()).toContain('Connect');
  });

  it('shows a sign in page', () => {
    browser.get('/auth/signin');
    const h1 = element(by.css('h1'));
    expect(h1.getText()).toContain('Sign in');
  });

  it('lets you nav between the two', () => {
    let h1;
    browser.get('/auth/connect');
    element(by.css('auth-frame a')).click();
    h1 = element(by.css('h1'));
    expect(h1.getText()).toContain('Sign in');
    element(by.css('auth-frame a')).click();
    h1 = element(by.css('h1'));
    expect(h1.getText()).toContain('Connect');
  });
});
