import { UPDATE_FIRST_DATE, UPDATE_SECOND_DATE } from '../constants/Calendar';

const initialState = {
    startDate: undefined,
    endDate: undefined
};

export default function(state = initialState, action) {
    switch (action.type) {
    case UPDATE_FIRST_DATE: {
        return {
            ...state,
            startDate: action.date
        };
    }

    case UPDATE_SECOND_DATE: {
        return state;
    }

    default:
        return state;
    }
}
