import { UPDATE_FIRST_DATE, UPDATE_SECOND_DATE } from '../constants/Calendar';

export const updateFirstDate = date => ({
    type: UPDATE_FIRST_DATE,
    date
});

export const updateSecondDate = date => ({
    type: UPDATE_SECOND_DATE,
    date
});
