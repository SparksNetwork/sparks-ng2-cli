import { browser, element, by, ExpectedConditions } from 'protractor';

import { getFirebaseAuth, deleteUserIfExists, logoutFirebase } from '../shared';
const fbAuth = getFirebaseAuth();

describe('can create an account with email and password', () => {

  beforeEach(done => {
    deleteUserIfExists(process.env.EMAIL_TEST_EMAIL)
      .then(res => logoutFirebase(browser))
      .then(res => done());
  });

  it('lets me create an account with email and password', () => {
    browser.get('/auth/connect');
    element(by.css('email-auth-form [type=text]')).sendKeys(process.env.EMAIL_TEST_EMAIL);
    element(by.css('email-auth-form [type=password]')).sendKeys(process.env.EMAIL_TEST_PASSWORD);
    element(by.css('email-auth-form [type=button]')).click();
    browser.sleep(3000);
    expect(element(by.css('body')).getText()).toContain(process.env.EMAIL_TEST_EMAIL);
  });

});

describe('can login w existing email-based account', () => {

  beforeEach(done => {
    deleteUserIfExists(process.env.EMAIL_TEST_EMAIL)
      .then(res => logoutFirebase(browser))
      .then(
        succ => fbAuth.createUser({
          uid: 'TEST-UID',
          email: process.env.EMAIL_TEST_EMAIL,
          password: process.env.EMAIL_TEST_PASSWORD,
        })
      )
      .then(
        user => { console.log('user created', user); },
        err => { console.log('user creation err', err); },
      )
      .then(res => done());
  });

  it('lets me login', () => {
    browser.get('/auth/signin');
    element(by.css('email-auth-form [type=text]')).sendKeys(process.env.EMAIL_TEST_EMAIL);
    element(by.css('email-auth-form [type=password]')).sendKeys(process.env.EMAIL_TEST_PASSWORD);
    element(by.css('email-auth-form [type=button]')).click();
    browser.sleep(3000);
    expect(element(by.css('body')).getText()).toContain(process.env.EMAIL_TEST_EMAIL);
  });

  it('lets me login even if i try from the "connect" screen', () => {
    browser.get('/auth/connect');
    element(by.css('email-auth-form [type=text]')).sendKeys(process.env.EMAIL_TEST_EMAIL);
    element(by.css('email-auth-form [type=password]')).sendKeys(process.env.EMAIL_TEST_PASSWORD);
    element(by.css('email-auth-form [type=button]')).click();
    browser.sleep(3000);
    expect(element(by.css('body')).getText()).toContain(process.env.EMAIL_TEST_EMAIL);
  });

});
