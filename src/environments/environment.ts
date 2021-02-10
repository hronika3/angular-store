// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import 'zone.js/dist/zone-error';
import {Environment} from './interface';

export const environment: Environment = {
    production: false,
    apiKey: 'AIzaSyBfNmpwic98qlqHCEd2s7Tl3X_ZmGmzzyg',
    fbDbUrl: 'https://angular-store-46ae1-default-rtdb.firebaseio.com',
    firebase: {
        apiKey: 'AIzaSyBfNmpwic98qlqHCEd2s7Tl3X_ZmGmzzyg',
        authDomain: 'angular-store-46ae1.firebaseapp.com',
        databaseURL: 'https://angular-store-46ae1-default-rtdb.firebaseio.com',
        projectId: 'angular-store-46ae1',
        storageBucket: 'angular-store-46ae1.appspot.com',
        messagingSenderId: '300576370994',
        appId: '1:300576370994:web:3e0f9451fad0f6da23e72b'
    },
    database: 'firebase',
    socialAuthEnabled: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
