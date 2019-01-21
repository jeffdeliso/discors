import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import Splash from './splash/splash';
import LoginForm from './session_form/login_form_container';
import SignupForm from './session_form/signup_form';


const App = () => (
  <Switch>
    <Route path="/register" component={SignupForm} />
    <Route path="/login" component={LoginForm} />
    <Route path="/" component={Splash} />
  </Switch >
);

export default App;
