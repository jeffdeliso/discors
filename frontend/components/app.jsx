import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import LoginForm from './session_form/login_form_container';
import SignupForm from './session_form/signup_form_container';
import Splash from './splash/splash_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import AppRoot from './app/app_root_container';


const App = () => (
  <Switch>
    <AuthRoute exact path="/login" component={LoginForm} />
    <AuthRoute exact path="/register" component={SignupForm} />
    <ProtectedRoute path="/channels" component={AppRoot} />
    <Route path="/" component={Splash} />
  </Switch>
);

export default App;