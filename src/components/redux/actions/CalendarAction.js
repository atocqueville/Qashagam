import { UPDATE_RESERVATION_DATES, DELETE_RESERVATION_DATES } from '../constants/Calendar';

export const updateReservationDates = date => ({
    type: UPDATE_RESERVATION_DATES,
    date
});

export const deleteReservationDates = () => ({
    type: DELETE_RESERVATION_DATES
});