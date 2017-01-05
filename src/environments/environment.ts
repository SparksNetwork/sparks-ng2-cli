// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDGgv75wKHiS-BsegtBQKnPmnGuWpKMsSo',
    authDomain: 'sparks-production-3.firebaseapp.com',
    databaseURL: 'https://sparks-production-3.firebaseio.com',
    storageBucket: 'gs://sparks-production-3.appspot.com',
    messagingSenderId: '277847429817',
  },
};
