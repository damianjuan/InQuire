import React from 'react';
import { Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component, isAuthenticated }) {
    const Component = component;
    const CheckIsAuthenticated = isAuthenticated;


    return (
        CheckIsAuthenticated ? (
            <Component />
        ) : (
                <div>not logged in</div>
            )
    )
};
