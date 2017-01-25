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
        .then(res => loginAsEmailUser(browser))
      .then(res => done());
  });

  fdescribe('completing steps', () => {

    it('lets me move through all the steps as i finish questions', () => {
      browser.get('/apply/SF1/O1');
      browser.wait(ExpectedConditions.visibilityOf(element(by.css('h1'))), 5000);
      expect(element(by.css('[aria-selected="true"]')).getText()).toContain('You');
      element(by.css('[formcontrolname="superpower"]')).sendKeys('I eat pie');
      element(by.css('[formcontrolname="legalName"]')).sendKeys('Bob');
      element(by.css('[formcontrolname="displayName"]')).sendKeys('Bobalicious');
      element(by.css('[formcontrolname="phoneNumber"]')).sendKeys('123 456 7890');
      element(by.css('[formcontrolname="birthday"]')).sendKeys('10/25/74');
      element(by.css('[formcontrolname="zipCode"]')).sendKeys('12345');
      browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('#continue'))), 5000);
      element(by.css('#continue')).click();
      browser.sleep(100);
      expect(element(by.css('[aria-selected="true"]')).getText()).toContain('Question');

      // browser.wait(ExpectedConditions.presenceOf(element(by.css('[formcontrolname="answer"]'))), 5000);
      element(by.css('[formcontrolname="answer"]')).sendKeys('This is my answer.  There are many like it, but this one is mine.');
      browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('#continue'))), 5000);
      element(by.css('#continue')).click();
      browser.sleep(100);
      const tab2 = element(by.css('[aria-selected="true"]'));
      expect(tab2.getText()).toContain('Teams');
    });

  });

});
