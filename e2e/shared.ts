import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert('./firebase-credentials.json'),
  databaseURL: 'https://sparks-development-sd.firebaseio.com',
});

const fbAuth: any = admin.auth();

export function getFirebaseAuth() { return fbAuth; }

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
