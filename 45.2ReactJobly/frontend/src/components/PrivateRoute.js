import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from './context/CurrentUserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
