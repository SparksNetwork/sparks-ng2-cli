import { browser, element, by, ExpectedConditions } from 'protractor';

import { logoutFirebase, initializeFirebaseData, loginAsEmailUser, createTestEmailUser, deleteUserIfExists } from '../shared';
import { data } from './fixtures';

describe('Apply / Navigation', () => {

  beforeEach(done => {
    // bug in angularfire2+protractor interaction https://github.com/angular/angularfire2/issues/779
    browser.ignoreSynchronization = true;
    logoutFirebase(browser)
        .then(res => initializeFirebaseData(data))
        .then(res => deleteUserIfExists())
        .then(res => createTestEmailUser())
      .then(res => done());
  });

  describe('when not authed', () => {

    it('redirects you to connect and then back to application', () => {
      browser.get('/apply/SF1/O1');
      const title1 = element(by.css('h1'));
      expect(title1.getText()).toContain('Connect');
      element(by.css('email-auth-form [type=text]')).sendKeys(process.env.EMAIL_TEST_EMAIL);
      element(by.css('email-auth-form [type=password]')).sendKeys(process.env.EMAIL_TEST_PASSWORD);
      element(by.css('email-auth-form [type=button]')).click();
      browser.wait(ExpectedConditions.textToBePresentInElement(element(by.css('h1')), 'Sparksfest'), 5000);
      const title2 = element(by.css('h1'));
      expect(title2.getText()).toContain('Sparksfest');
    });

  });

  describe('when authed', () => {
    beforeEach(done => {
      loginAsEmailUser(browser)
        .then(res => done());
    });

    it('doesnt redirect you', () => {
      browser.get('/apply/SF1/O1');
      browser.wait(ExpectedConditions.visibilityOf(element(by.css('h1'))), 5000);
      const title1 = element(by.css('h1'));
      expect(title1.getText()).toContain('Sparksfest');
    });

  });

});
