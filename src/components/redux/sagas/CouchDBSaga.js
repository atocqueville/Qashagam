import { put, call, takeLatest } from 'redux-saga/effects';

import { GET_ALL_TRIPS, GET_ALL_TRIPS_SUCCEEDED, GET_ALL_TRIPS_FAILED } from '../constants/CouchDB';
import { ADD_NEW_TRIP, ADD_NEW_TRIP_SUCCEEDED, ADD_NEW_TRIP_FAILED } from '../constants/CouchDB';
import { SIGN_UP } from '../constants/CouchDB';

import PouchDB from 'pouchdb';
var db = new PouchDB('http://192.168.1.12:5984/trips');
import firebase from '../../firebase';

// var usersRef = firebase.firestore().collection('users').doc('admin');
// var getDoc = usersRef.get()
//   .then(doc => {
//     if (!doc.exists) {
//       console.log('No such document!');
//     } else {
//       console.log('Document data:', doc.data());
//     }
//   })
//   .catch(err => {
//     console.log('Error getting document', err);
//   });
function* fetchTrips() {
    try {
        const docs = yield db.allDocs({include_docs: true});

        yield put({
            type: GET_ALL_TRIPS_SUCCEEDED,
            trips: docs.rows
        });
    } catch (e) {
        yield put({
            type: GET_ALL_TRIPS_FAILED,
            message: e.message
        });
    }
}

function* signUp(action){
    var usersRef = firebase.firestore().collection('users').doc('admin');

    try {
        const auth = app.auth();
        const result = yield call(
            [auth, auth.createUserWithEmailAndPassword],
            'admin',
            'admin'
        );
            console.log('laffd')
        // yield put({ type: SIGN_UP_SUCCESS, user: action.user });
    } catch (error) {
        console.log(error)
        const error_message = { code: error.code, message: error.message };
        // yield put({ type: AUTHENTICATION_FAILED, error: error_message });
    }
}

function* addTrip(action) {
    try {
        yield db.put(action.trip);
        
        yield put({
            type: ADD_NEW_TRIP_SUCCEEDED
        });
    } catch (e) {
        yield put({
            type: ADD_NEW_TRIP_FAILED,
            message: e.message
        });
    }
}

function* mySaga() {
    yield takeLatest(GET_ALL_TRIPS, fetchTrips),
    yield takeLatest(ADD_NEW_TRIP, addTrip),
    yield takeLatest(SIGN_UP, signUp);
}

export default mySaga;