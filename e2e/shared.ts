import * as admin from 'firebase-admin';
import { FirebaseRef } from 'angularfire2';

admin.initializeApp({
  credential: admin.credential.cert('./firebase-credentials.json'),
  databaseURL: 'https://sparks-development-sd.firebaseio.com',
});

const fbAuth: any = admin.auth();
const fbDatabase: any = admin.database();

export function getFirebaseAuth() { return fbAuth; }

export function getFirebaseDatabase() { return fbDatabase; }

export function initializeFirebaseData(data: Object) {
  return fbDatabase.ref('/').set(data);
}

export function deleteUserIfExists(email: string) {
    return fbAuth.getUserByEmail(email)
      .then(
        user => fbAuth.deleteUser(user.uidInternal),
        err => { console.log('no user to delete'); },
      );
}

export function logoutFirebase(browser) {
    return browser.executeScript('window.auth.logout();')
      .then(
        res => { console.log('logged out'); },
        err => { console.log('unable to logout'); },
      );
}
