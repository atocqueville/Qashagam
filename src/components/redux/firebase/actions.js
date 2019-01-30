import { SIGN_IN, SIGN_UP, SIGN_OUT, UPDATE_USER, GET_FAMILY } from './constants';

export const signIn = (email, password) => ({
    type: SIGN_IN,
    email,
    password
});

export const signUp = (email, password, famille) => ({
    type: SIGN_UP,
    email,
    password,
    famille
});

export const signOut = () => ({
    type: SIGN_OUT
});

export const updateUser = (auth) => ({
    type: UPDATE_USER,
    auth
});

export const getFamily = (user) => ({
    type: GET_FAMILY,
    user
});