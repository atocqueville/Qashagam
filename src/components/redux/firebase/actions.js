import { SIGN_IN, SIGN_UP } from './constants';
import { UPDATE_USER } from './constants';

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

export const updateUser = (user, auth) => ({
    type: UPDATE_USER,
    user,
    auth
});