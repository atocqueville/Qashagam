import { SIGN_IN, SIGN_UP } from './constants';

export const signIn = (email, password, history) => ({
    type: SIGN_IN,
    email,
    password,
    history
});

export const signUp = (email, password, famille, history) => ({
    type: SIGN_UP,
    email,
    password,
    famille,
    history
});