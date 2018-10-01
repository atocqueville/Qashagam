import { UPDATE_RESERVATION_DATES, DELETE_RESERVATION_DATES } from '../constants/Calendar';

import dateFns from 'date-fns';

const initialState = {
    startDate: undefined,
    endDate: undefined
};

export default function(state = initialState, action) {
    switch (action.type) {
    case UPDATE_RESERVATION_DATES: {
        var startDate_tmp = state.startDate;
        var endDate_tmp = state.endDate;

        if (!startDate_tmp && !endDate_tmp) {
            startDate_tmp = action.date;
        } else if (startDate_tmp && !endDate_tmp) {
            var comparator = dateFns.compareAsc(startDate_tmp, action.date);
            if (comparator === 1) {
                endDate_tmp = startDate_tmp;
                startDate_tmp = action.date;
            } else {
                endDate_tmp = action.date;
            }
        }

        return {
            ...state,
            startDate: startDate_tmp,
            endDate: endDate_tmp
        };
    }

    case DELETE_RESERVATION_DATES: {
        return {
            ...state,
            startDate: undefined,
            endDate: undefined
        };
    }

    default:
        return state;
    }
}
