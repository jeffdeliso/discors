import React from 'react';
import { Link } from 'react-router-dom';
import Servers from './servers/servers';
import Channels from './channels/channels';
import Header from './header/header';
import Chat from './chat/chat';
import ServerMembers from './server_members/server_members';

const AppRoot = (props) => (
  <div className="main-body">
    <Servers />
    <div className="right-main">
      <Channels />
    </div>
    <div className="chat-container">
      <Header />
      <div className="chat-main-container">
        <Chat />
        <ServerMembers />
      </div>
    </div>
    <button onClick={() => props.logout()}>Logout</button>
    {/* <Link to="/">Home</Link> */}
  </div>
);

export default AppRoot;