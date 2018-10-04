import { GET_ALL_TRIPS, ADD_NEW_TRIP, RESET_STATE } from '../constants/CouchDB';

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