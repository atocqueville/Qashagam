import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import calendar from './calendar/reducer';
import firebase from './firebase/reducer';

export default combineReducers({
    calendar,
    firebase,
    form: formReducer
});