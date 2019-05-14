import React from 'react';
import Channels from '../channels/channels/channels_container';
import ServerMain from './server_main';

function ServerRoute(props) {
  return (
    <>
      <Channels />
      <ServerMain />
    </>
  )
}

export default ServerRoute;
