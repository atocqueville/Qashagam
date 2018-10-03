import { put, takeLatest } from 'redux-saga/effects';

import { GET_ALL_TRIPS, GET_ALL_TRIPS_SUCCEEDED, GET_ALL_TRIPS_FAILED } from '../constants/CouchDB';
import { ADD_NEW_TRIP, ADD_NEW_TRIP_SUCCEEDED, ADD_NEW_TRIP_FAILED } from '../constants/CouchDB';

import PouchDB from 'pouchdb';
var db = new PouchDB('http://tokie:detok@localhost:5984/trips');


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
    yield takeLatest(ADD_NEW_TRIP, addTrip);
}

export default mySaga;