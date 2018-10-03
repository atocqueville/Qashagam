import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import calendarReducer from './reducers/CalendarReducer';
import couchDBReducer from './reducers/CouchDBReducer';

export default combineReducers({
    calendarReducer,
    couchDBReducer,
    form: formReducer
});