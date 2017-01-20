import * as admin from 'firebase-admin';
import { ProtractorBrowser } from 'protractor';
import { FirebaseRef, AuthMethods, AuthProviders } from 'angularfire2';

admin.initializeApp({
  credential: admin.credential.cert('./firebase-credentials.json'),
  databaseURL: 'https://sparks-development-sd.firebaseio.com',
});

const fbAuth: any = admin.auth();
const fbDatabase: any = admin.database();

export function getFirebaseAuth() { return fbAuth; }

export function getFirebaseDatabase() { return fbDatabase; }

export function initializeFirebaseData(data: Object) {
  console.log('*** initializeFirebaseData: initializing');
  return fbDatabase.ref('/').set(data)
    .then(
        res => { console.log('*** initializeFirebaseData: initialized'); },
        err => { console.log('*** initializeFirebaseData: unable to initialize'); },
    );
}

export function deleteUserIfExists(email = process.env.EMAIL_TEST_EMAIL as string) {
    return fbAuth.getUserByEmail(email)
      .then(
        user => fbAuth.deleteUser(user.uidInternal)
          .then(
            res => { console.log('*** deleteUserIfExists: deleted'); },
            err => { console.log('*** deleteUserIfExists: unable to delete'); },
          ),
        err => { console.log('*** deleteUserIfExists: no user to delete'); },
      );
}

export function createTestEmailUser(
  uid = 'TEST-UID',
  email = process.env.EMAIL_TEST_EMAIL as string,
  password = process.env.EMAIL_TEST_PASSWORD as string
) {
  return fbAuth.createUser({uid, email, password})
  .then(
      res => { console.log('*** createTestEmailUser: created'); },
      err => { console.log('*** createTestEmailUser: unable to create'); },
  );
}

export function loginAsEmailUser(
  browser: ProtractorBrowser,
  email = process.env.EMAIL_TEST_EMAIL as string,
  password = process.env.EMAIL_TEST_PASSWORD as string
) {
  const authConfig = `{provider: ${AuthProviders.Password}, method: ${AuthMethods.Password}}`;
  const authCreds = `{email: "${email}", password: "${password}"}`;
  const authCall = `window.auth.login(${authCreds}, ${authConfig})`;
  console.log('*** loginAsEmailUser: executing:', authCall);

  return browser.get('/').then(
    () => browser.executeScript(authCall)
      .then(
        res => { console.log('*** loginAsEmailUser: success'); browser.sleep(1000); },
        err => { console.log('*** loginAsEmailUser: err', err); }
      )
  );
}

export function logoutFirebase(browser) {
    return browser.executeScript('window.auth.logout();')
      .then(
        res => { console.log('*** logoutFirebase: logged out'); },
        err => { console.log('*** logoutFirebase: unable to logout'); },
      );
}
