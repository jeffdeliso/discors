import React from 'react';
import { Link } from 'react-router-dom';
import Channels from '../channels/channels_container';
import Header from '../header/header_container';
import Chat from '../chat/chat';
import ServerMembers from '../server_members/server_members_container';
import Servers from '../servers/servers_container';

class ServerRoute extends React.Component {

  render() {
    return (
      <>
        <Servers />
        <Channels />
        <div className="chat-container">
          <Header />
          <div className="chat-main-container">
            <Chat />
            <ServerMembers />
          </div>
        </div>
      </>
    )
  }
}

export default ServerRoute;