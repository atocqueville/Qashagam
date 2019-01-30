import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';

import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './constants';
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './constants';
import { SIGN_OUT } from './constants';
import { GET_FAMILY, GET_FAMILY_SUCCESS, GET_FAMILY_FAILURE } from './constants';

import firebase from './initFirebase';

// function* fetchTrips() {
//     try {
//         const docs = yield db.allDocs({include_docs: true});

//         yield put({
//             type: GET_ALL_TRIPS_SUCCEEDED,
//             trips: docs.rows
//         });
//     } catch (e) {
//         yield put({
//             type: GET_ALL_TRIPS_FAILED,
//             message: e.message
//         });
//     }
// }

// function* addTrip(action) {
//     try {
//         yield db.put(action.trip);
        
//         yield put({
//             type: ADD_NEW_TRIP_SUCCEEDED
//         });
//     } catch (e) {
//         yield put({
//             type: ADD_NEW_TRIP_FAILED,
//             message: e.message
//         });
//     }
// }

function* signUp(action) {
    yield delay(1000);
    try {
        var result = yield firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
        yield firebase.firestore().collection('users').doc(result.user.uid).set({
            famille: action.famille
        });
        yield put({ type: SIGN_UP_SUCCESS });
    } catch (error) {
        yield put({ type: SIGN_UP_FAILURE, error });
    }
}

function* signIn(action) {
    yield delay(1000);
    try {
        yield firebase.auth().signInWithEmailAndPassword(action.email, action.password);
        yield put({ type: SIGN_IN_SUCCESS });
    } catch (error) {
        yield put({ type: SIGN_IN_FAILURE, error });
    }
}

function* signOut() {
    try {
        yield firebase.auth().signOut();
    } catch (error) {
        yield put({ type: SIGN_IN_FAILURE, error });
    }
}

function* getFamily(action) {
    var docRef = firebase.firestore().collection('users').doc(action.user.uid);
    try {
        var result = yield docRef.get();
        yield put({ type: GET_FAMILY_SUCCESS, result: result.data() });
    } catch (error) {
        yield put({ type: GET_FAMILY_FAILURE, error });
    }
}

function* mySaga() {
    // yield takeLatest(GET_ALL_TRIPS, fetchTrips),
    // yield takeLatest(ADD_NEW_TRIP, addTrip),
    yield takeLatest(SIGN_UP, signUp);
    yield takeLatest(SIGN_IN, signIn);
    yield takeLatest(SIGN_OUT, signOut);
    yield takeLatest(GET_FAMILY, getFamily);
}

export default mySaga;