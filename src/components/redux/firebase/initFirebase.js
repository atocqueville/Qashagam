import firebase from 'firebase';
import { config } from '../../../../CREDENTIALS';

firebase.initializeApp(config);

export default firebase;