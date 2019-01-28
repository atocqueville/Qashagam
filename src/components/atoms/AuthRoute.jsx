/* eslint-disable */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AuthRoute({
    component: Component,
    ...props
}) {
    return (
        <Route
            {...props}
            render={() => props.authenticated === true ?
                (<Component />) : (<Redirect to='/' />)
            }
        />
    );
}