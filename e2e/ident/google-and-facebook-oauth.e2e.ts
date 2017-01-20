import { browser, element, by } from 'protractor';

import { deleteUserIfExists, logoutFirebase } from '../shared';

describe('Ident / Google and Facebook', () => {

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

  // TODO: get this working without all the damn sleeps
  // see commented out code for previous attempts
  describe('UAT1: connect with google', () => {

    beforeEach(done => {
      // bug in angularfire2+protractor interaction https://github.com/angular/angularfire2/issues/779
      browser.ignoreSynchronization = true;
      deleteUserIfExists(process.env.GOOGLE_TEST_EMAIL)
        .then(res => logoutFirebase(browser))
        .then(res => done());
    });

    it('shows my email after connecting', () => {
      browser.get('/auth/%2F/connect');
      // browser.ignoreSynchronization = true;
      element(by.css('google-auth-button')).click();
      browser.sleep(3000);
      // browser.wait(ExpectedConditions.urlContains('accounts.google.com'), 5000, 'No accounts.google.com in url');
      // browser.wait(ExpectedConditions.presenceOf(element(by.css('#Email'))), 5000, 'No #Email in page');
      element(by.css('#Email')).sendKeys(process.env.GOOGLE_TEST_EMAIL);
      element(by.css('#next')).click();
      browser.sleep(3000);
      // browser.pause();
      // browser.wait(ExpectedConditions.presenceOf(element(by.css('#Passwd'))), 5000);
      element(by.css('#Passwd')).sendKeys(process.env.GOOGLE_TEST_EMAIL_PASSWORD);
      element(by.css('#signIn')).click();
      browser.sleep(3000);
      // browser.ignoreSynchronization = false;
      // browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('#submit_approve_access'))), 5000);
      // element(by.css('#submit_approve_access')).click();
      expect(element(by.css('body')).getText()).toContain(process.env.GOOGLE_TEST_EMAIL);
    });

  });

  // TODO: get this working without all the damn sleeps
  // see commented out code for previous attempts
  describe('UAT2: connect with facebook', () => {

    beforeEach(done => {
      // bug in angularfire2+protractor interaction https://github.com/angular/angularfire2/issues/779
      browser.ignoreSynchronization = true;
      deleteUserIfExists(process.env.FACEBOOK_TEST_EMAIL)
        .then(res => logoutFirebase(browser))
        .then(res => done());

    });

    it('shows my email after connecting', () => {
      browser.manage().deleteAllCookies();
      browser.get('/auth/%2F/connect');
      // browser.ignoreSynchronization = true;
      element(by.css('facebook-auth-button')).click();
      browser.sleep(3000);
      // browser.wait(ExpectedConditions.urlContains('accounts.google.com'), 5000, 'No accounts.google.com in url');
      // browser.wait(ExpectedConditions.presenceOf(element(by.css('#Email'))), 5000, 'No #Email in page');
      element(by.css('#email')).sendKeys(process.env.FACEBOOK_TEST_EMAIL);
      element(by.css('#pass')).sendKeys(process.env.FACEBOOK_TEST_EMAIL_PASSWORD);
      element(by.css('[type=submit]')).click();
      browser.sleep(3000);
      // browser.pause();
      // browser.wait(ExpectedConditions.presenceOf(element(by.css('#Passwd'))), 5000);
      // element(by.css('#signIn')).click();
      // browser.sleep(3000);
      // browser.ignoreSynchronization = false;
      // browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('#submit_approve_access'))), 5000);
      // element(by.css('#submit_approve_access')).click();
      expect(element(by.css('body')).getText()).toContain(process.env.FACEBOOK_TEST_EMAIL);
    });

  });

});
