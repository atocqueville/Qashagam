import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';

import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './constants';
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './constants';
// import { ADD_USER_TO_FAMILY } from './constants';

import firebase from './initFirebase';

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

function* signUp(action) {
    yield delay(1000);
    try {
        var result = yield firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
        // yield put({ type: ADD_USER_TO_FAMILY, famille: action.famille });
        yield put({ type: SIGN_UP_SUCCESS, result });
    } catch (error) {
        yield put({ type: SIGN_UP_FAILURE, error });
    }
}

function* signIn(action) {
    yield delay(1000);
    try {
        var result = yield firebase.auth().signInWithEmailAndPassword(action.email, action.password);
        yield put({ type: SIGN_IN_SUCCESS, result });
    } catch (error) {
        yield put({ type: SIGN_IN_FAILURE, error });
    }
}

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

function* mySaga() {
    // yield takeLatest(GET_ALL_TRIPS, fetchTrips),
    // yield takeLatest(ADD_NEW_TRIP, addTrip),
    yield takeLatest(SIGN_UP, signUp);
    yield takeLatest(SIGN_IN, signIn);
}

export default mySaga;