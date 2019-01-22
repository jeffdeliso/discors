import React from 'react';
import { Link } from 'react-router-dom';

const Main = (props) => (
  <>
  <button onClick={() => props.logout()}>Logout</button>
  <Link to="/">Home</Link>
  </>
);

export default Main;