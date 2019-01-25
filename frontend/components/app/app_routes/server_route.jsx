import React from 'react';
import { Link } from 'react-router-dom';
import Channels from '../channels/channels_container';
import Header from '../header/header_container';
import Chat from '../chat/chat_container';
import ServerMembers from '../server_members/server_members_container';
import Servers from '../servers/servers_container';
import Main from './main';

class ServerRoute extends React.Component {

  render() {
    return (
      <>
        <Servers />
        <Channels />
        <Main />
      </>
    )
  }
}

export default ServerRoute;
