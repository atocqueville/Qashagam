import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './constants';
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './constants';
import { UPDATE_USER } from './constants';
import { GET_FAMILY_SUCCESS, GET_FAMILY_FAILURE } from './constants';
import { ADD_TRIP, ADD_TRIP_SUCCESS, ADD_TRIP_FAILURE, ADD_TRIP_CLEAR } from './constants';

import Error from '../../classes/Error';

const initialState = {
    trips: undefined,
    
    loading: false,
    success: false,
    failure: false,

    signupError: new Error(),
    signinError: new Error(),

    authenticated: false,
    famille: undefined
};

export default function(state = initialState, action) {
    switch (action.type) {

    case UPDATE_USER: {
        return {
            ...state,
            authenticated: action.auth
        };
    }

    case SIGN_UP: {
        return {
            ...state,
            loading: true
        };
    }
    case SIGN_UP_SUCCESS: {
        return {
            ...state,
            loading: false,
            signupError: new Error()
        };
    }
    case SIGN_UP_FAILURE: {
        return {
            ...state,
            loading: false,
            signupError: new Error(action.error.code)
        };
    }

    case SIGN_IN: {
        return {
            ...state,
            loading: true
        };
    }
    case SIGN_IN_SUCCESS: {
        return {
            ...state,
            loading: false,
            signinError: new Error()
        };
    }
    case SIGN_IN_FAILURE: {
        return {
            ...state,
            loading: false,
            signinError: new Error(action.error.code)
        };
    }

    case GET_FAMILY_SUCCESS: {
        return {
            ...state,
            famille: action.result.famille
        };
    }
    case GET_FAMILY_FAILURE: {
        return {
            ...state,
            famille: 'none'
        };
    }

    // case GET_ALL_TRIPS_SUCCEEDED: {
    //     return {
    //         ...state,
    //         trips: action.trips
    //     };
    // }

    case ADD_TRIP: {
        return {
            ...state,
            loading: true,
            success: false,
            failure: false
        };
    }
    case ADD_TRIP_SUCCESS: {
        return {
            ...state,
            loading: false,
            success: true,
            failure: false
        };
    }
    case ADD_TRIP_FAILURE: {
        return {
            ...state,
            loading: false,
            success: false,
            failure: true
        };
    }
    case ADD_TRIP_CLEAR: {
        return {
            ...state,
            loading: false,
            success: false,
            failure: false
        };
    }

    // case RESET_STATE: {
    //     return {
    //         ...state,
    //         loading: false,
    //         success: false,
    //         failure: false
    //     };
    // }

    default:
        return state;
    }
}
