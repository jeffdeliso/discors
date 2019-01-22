import React from 'react';
import { Link } from 'react-router-dom';
import Servers from './servers/servers';
import Channels from './channels/channels_container';
import Header from './header/header';
import Chat from './chat/chat';
import ServerMembers from './server_members/server_members';

class AppRoot extends React.Component {
  componentDidMount() {
    document.body.style="overflow: hidden;";
  }

  componentWillUnmount() {
    document.body.removeAttribute("style")
  }

  render() {
    return (
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
      </div>
    )
  }
}

export default AppRoot;