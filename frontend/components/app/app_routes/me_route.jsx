import React from 'react';
import { Link } from 'react-router-dom';
import Channels from '../channels/channels_container';
import Header from '../header/header_container';
import Chat from '../chat/chat_container';
import ServerMembers from '../server_members/server_members_container';
import Servers from '../servers/servers_container';
import MeHeader from '../header/me_header/me_header_container';
import DMChannels from '../channels/dm_channels/dm_channels_container';

class MeRoute extends React.Component {

  render() {
    return (
      <>
        <Servers />
        <DMChannels />
        <div className="chat-container">
          <MeHeader />
          <div className="chat-main-container">
            <Chat />
          </div>
        </div>
      </>
    )
  }
}


export default MeRoute;
