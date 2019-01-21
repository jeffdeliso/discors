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

const App = () => (
  <div>
    <h1>Discors</h1>
    <Splash />
  </div>
);

export default App;