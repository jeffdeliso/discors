import React from 'react';
import Channels from '../channels/channels/channels_container';
import ServerMain from './server_main';

class ServerRoute extends React.Component {
  render() {
    return (
      <>
        <Channels />
        <ServerMain />
      </>
    )
  }
}

export default ServerRoute;
