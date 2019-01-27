import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDjq1-SmlwR7to20LMjxQrmuJXVyvalO8c',
    authDomain: 'qashagam.firebaseapp.com',
    databaseURL: 'https://qashagam.firebaseio.com',
    projectId: 'qashagam',
    storageBucket: 'qashagam.appspot.com',
    messagingSenderId: '175679231480'
};

firebase.initializeApp(config);

export default firebase;