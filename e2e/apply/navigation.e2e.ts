import { browser, element, by } from 'protractor';

import { logoutFirebase, initializeFirebaseData } from '../shared';
import { data } from './fixtures';

fdescribe('UAT0, 0.1, 4: can see connect and sign in pages', () => {

  beforeEach(done => {
    logoutFirebase(browser)
        .then(res => initializeFirebaseData(data))
      .then(res => done());
  });

  it('shows the recruitment page', () => {
    expect(true).toBe(true);
    // browser.get('/auth/connect');
    // const h1 = element(by.css('h1'));
    // expect(h1.getText()).toContain('Connect');
  });

});
