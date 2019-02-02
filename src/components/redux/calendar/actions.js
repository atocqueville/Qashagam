import { UPDATE_RESERVATION_DATES, DELETE_RESERVATION_DATES, OPEN_DIALOG_FORM } from './constants';

export const updateReservationDates = date => ({
    type: UPDATE_RESERVATION_DATES,
    date
});

export const deleteReservationDates = () => ({
    type: DELETE_RESERVATION_DATES
});

export const openDialogForm = () => ({
    type: OPEN_DIALOG_FORM
});