import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component, restricted = () => false, NotFoundPage = null, redirect = '/login', ...rest }) => {
    return restricted() ? (<Redirect to={redirect} />) : (<Route {...rest} component={component} />);
};

export default PublicRoute;
