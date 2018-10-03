import { GET_ALL_TRIPS, ADD_NEW_TRIP } from '../constants/CouchDB';

export const getAllTrips = () => ({
    type: GET_ALL_TRIPS
});

export const addNewTrip = (trip) => ({
    type: ADD_NEW_TRIP,
    trip
});