import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './session_form/login/login_form_container';
import SignupForm from './session_form/signup/signup_form_container';
import Splash from './splash/splash_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import AppRoot from './app/app_root';

const App = () => (
  <Switch>
    <AuthRoute path="/login" component={LoginForm} />
    <AuthRoute path="/register" component={SignupForm} />
    <ProtectedRoute path="/channels" component={AppRoot} />
    <Route path="/" component={Splash} />
  </Switch>
);

export default App;