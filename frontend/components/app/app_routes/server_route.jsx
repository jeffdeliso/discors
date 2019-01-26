import React from 'react';
import Channels from '../channels/channels_container';
import Main from './main';

class ServerRoute extends React.Component {

  render() {
    return (
      <>
        <Channels />
        <Main />
      </>
    )
  }
}

export default ServerRoute;
