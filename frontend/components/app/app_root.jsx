import React from 'react';
import { Link } from 'react-router-dom';
import Servers from './servers/servers';

const AppRoot = (props) => (
  <div className="main-body">
    <Servers />
    <button onClick={() => props.logout()}>Logout</button>
    <Link to="/">Home</Link>
  </div>
);

export default AppRoot;