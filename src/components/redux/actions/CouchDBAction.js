import { GET_ALL_TRIPS, ADD_NEW_TRIP, RESET_STATE, SIGN_UP } from '../constants/CouchDB';

export const getAllTrips = () => ({
    type: GET_ALL_TRIPS
});

export const addNewTrip = (trip) => ({
    type: ADD_NEW_TRIP,
    trip
});

export const resetState = () => ({
    type: RESET_STATE
});

export const signUp = () => ({
    type: SIGN_UP
});