import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import JoblyApi from './api/JoblyApi';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navegation';
import LoginForm from './Loginform';
import SignupForm from './SignupForm';
import Profile from './Profile';
import CurrentUserContext from './context/CurrentUserContext'; // Context for current user

function App() {
  const [token, setToken] = useLocalStorage('token', '');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (token) {
      JoblyApi.token = token;
      const fetchUser = async () => {
        const user = await JoblyApi.getCurrentUser();
        setCurrentUser(user);
      };
      fetchUser();
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  const login = async (data) => {
    const { token } = await JoblyApi.login(data);
    setToken(token);
  };

  const signup = async (data) => {
    const { token } = await JoblyApi.signup(data);
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Navigation currentUser={currentUser} logout={logout} />
      {/* Your routing logic here */}
      {!currentUser ? (
        <>
          <LoginForm login={login} />
          <SignupForm signup={signup} />
        </>
      ) : (
        <Router>
            <PrivateRoute path="/profile" component={Profile} />
  <PrivateRoute path="/companies" component={CompanyList} />
  <PrivateRoute path="/jobs" component={JobList} />
  <PrivateRoute path="/companies/:handle" component={CompanyDetail} />
</Router>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
