import React from 'react';
import Main from '../pages/Main';


//checks to see if user is logged in and if so allows user to continue to original target, otherwise redirect user to main page
export default function ProtectedRoute({ component, isAuthenticated }) {
    const Component = component;
    const CheckIsAuthenticated = isAuthenticated;

    return (
        CheckIsAuthenticated ? (
            <Component />
        ) : (
                <Main />
            )
    )
};
