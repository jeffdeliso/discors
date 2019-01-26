import React from 'react';
import { Link } from 'react-router-dom';
import Channels from '../channels/channels_container';
import Header from '../header/header_container';
import Chat from '../chat/chat_container';
import ServerMembers from '../server_members/server_members_container';
import Servers from '../servers/servers_container';
import MeHeader from '../header/me_header/me_header_container';
import DMChannels from '../channels/dm_channels/dm_channels_container';
import Friends from '../friends/friends';
import FriendsHeader from '../friends/friends_header';

class FriendsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'all' };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tabName) {
    this.setState({ tab: tabName });
  }
  
  render() {
    return (
      <>
        <div className="chat-container">
          <FriendsHeader changeTab={this.changeTab} />
          <div className="chat-main-container">
            <Friends />
          </div>
        </div>
      </>
    )
  }
}


export default FriendsMain;