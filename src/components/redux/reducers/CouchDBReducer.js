import { GET_ALL_TRIPS_SUCCEEDED, ADD_NEW_TRIP, ADD_NEW_TRIP_SUCCEEDED, ADD_NEW_TRIP_FAILED, RESET_STATE } from '../constants/CouchDB';

const initialState = {
    trips: undefined,
    
    loading: false,
    success: false,
    failure: false
};

export default function(state = initialState, action) {
    switch (action.type) {

    case GET_ALL_TRIPS_SUCCEEDED: {
        return {
            ...state,
            trips: action.trips
        };
    }

    case ADD_NEW_TRIP: {
        return {
            ...state,
            loading: true,
            success: false,
            failure: false
        };
    }

    case ADD_NEW_TRIP_SUCCEEDED: {
        return {
            ...state,
            loading: false,
            success: true,
            failure: false
        };
    }

    case ADD_NEW_TRIP_FAILED: {
        return {
            ...state,
            loading: false,
            success: false,
            failure: true
        };
    }

    case RESET_STATE: {
        return {
            ...state,
            loading: false,
            success: false,
            failure: false
        };
    }

    default:
        return state;
    }
}
