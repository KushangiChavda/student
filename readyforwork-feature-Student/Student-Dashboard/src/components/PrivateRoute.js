import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from '../utils';

const PrivateRoute = ({ component, restricted = isLogin, NotFoundPage = null, redirect = '/login', ...rest }) => {
    return restricted() ? (<Route {...rest} component={component} />) : (NotFoundPage ? <NotFoundPage /> : <Redirect to={redirect} />);
};

export default PrivateRoute;