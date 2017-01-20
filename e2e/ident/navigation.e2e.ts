import { browser, element, by } from 'protractor';

import { logoutFirebase } from '../shared';

describe('Ident / Navigation', () => {

  describe('UAT0, 0.1, 4: can see connect and sign in pages', () => {

    beforeEach(done => {
      // bug in angularfire2+protractor interaction https://github.com/angular/angularfire2/issues/779
      browser.ignoreSynchronization = true;
      logoutFirebase(browser)
        .then(res => done());
    });

    it('shows a connect page', () => {
      browser.get('/auth/%2F/connect');
      const h1 = element(by.css('h1'));
      expect(h1.getText()).toContain('Connect');
    });

    it('shows a sign in page', () => {
      browser.get('/auth/%2F/signin');
      const h1 = element(by.css('h1'));
      expect(h1.getText()).toContain('Sign in');
    });

    it('lets you nav between the two', () => {
      let h1;
      browser.get('/auth/%2F/connect');
      element(by.css('auth-frame a')).click();
      h1 = element(by.css('h1'));
      expect(h1.getText()).toContain('Sign in');
      element(by.css('auth-frame a')).click();
      h1 = element(by.css('h1'));
      expect(h1.getText()).toContain('Connect');
    });
  });

});