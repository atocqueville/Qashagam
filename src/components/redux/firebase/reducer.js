import Cookies from 'js-cookie';

import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './constants';
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './constants';
import { UPDATE_USER } from './constants';

import Error from '../../classes/Error';

import firebase from './initFirebase';

const initialState = {
    trips: undefined,
    
    loading: false,
    success: false,
    failure: false,

    signupError: new Error(),
    signinError: new Error(),

    app: firebase,
    user: undefined,
    authenticated: false
};

export default function(state = initialState, action) {
    switch (action.type) {

    case UPDATE_USER: {
        return {
            ...state,
            user: action.user,
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
        Cookies.set('pd', 'lol');
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

    // case GET_ALL_TRIPS_SUCCEEDED: {
    //     return {
    //         ...state,
    //         trips: action.trips
    //     };
    // }

    // case ADD_NEW_TRIP: {
    //     return {
    //         ...state,
    //         loading: true,
    //         success: false,
    //         failure: false
    //     };
    // }

    // case ADD_NEW_TRIP_SUCCEEDED: {
    //     return {
    //         ...state,
    //         loading: false,
    //         success: true,
    //         failure: false
    //     };
    // }

    // case ADD_NEW_TRIP_FAILED: {
    //     return {
    //         ...state,
    //         loading: false,
    //         success: false,
    //         failure: true
    //     };
    // }

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
