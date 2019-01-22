import React from 'react';

const Main = (props) => (
  <button onClick={() => props.logout()}>Logout</button>
);

export default Main;