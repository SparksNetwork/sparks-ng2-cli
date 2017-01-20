import { browser, element, by } from 'protractor';

import { deleteUserIfExists, logoutFirebase, createTestEmailUser } from '../shared';

describe('Ident / Email Account', () => {

  describe('with no existing account', () => {

    beforeEach(done => {
      // bug in angularfire2+protractor interaction https://github.com/angular/angularfire2/issues/779
      browser.ignoreSynchronization = true;
      deleteUserIfExists(process.env.EMAIL_TEST_EMAIL)
        .then(res => logoutFirebase(browser))
        .then(res => done());
    });

    it('lets me create an account with email and password', () => {
      browser.get('/auth/%2F/connect');
      element(by.css('email-auth-form [type=text]')).sendKeys(process.env.EMAIL_TEST_EMAIL);
      element(by.css('email-auth-form [type=password]')).sendKeys(process.env.EMAIL_TEST_PASSWORD);
      element(by.css('email-auth-form [type=button]')).click();
      browser.sleep(5000);
      expect(element(by.css('body')).getText()).toContain(process.env.EMAIL_TEST_EMAIL);
    });

  });

  fdescribe('w existing email-based account', () => {

    beforeEach(done => {
      // bug in angularfire2+protractor interaction https://github.com/angular/angularfire2/issues/779
      browser.ignoreSynchronization = true;
      deleteUserIfExists(process.env.EMAIL_TEST_EMAIL)
        .then(res => logoutFirebase(browser))
        .then(res => createTestEmailUser())
        .then(res => done());
    });

    it('lets me login', () => {
      browser.get('/auth/%2F/signin');
      element(by.css('email-auth-form [type=text]')).sendKeys(process.env.EMAIL_TEST_EMAIL);
      element(by.css('email-auth-form [type=password]')).sendKeys(process.env.EMAIL_TEST_PASSWORD);
      element(by.css('email-auth-form [type=button]')).click();
      browser.sleep(3000);
      expect(element(by.css('body')).getText()).toContain(process.env.EMAIL_TEST_EMAIL);
    });

    it('lets me login even if i try from the "connect" screen', () => {
      browser.get('/auth/%2F/connect');
      element(by.css('email-auth-form [type=text]')).sendKeys(process.env.EMAIL_TEST_EMAIL);
      element(by.css('email-auth-form [type=password]')).sendKeys(process.env.EMAIL_TEST_PASSWORD);
      element(by.css('email-auth-form [type=button]')).click();
      browser.sleep(3000);
      expect(element(by.css('body')).getText()).toContain(process.env.EMAIL_TEST_EMAIL);
    });

  });

});
