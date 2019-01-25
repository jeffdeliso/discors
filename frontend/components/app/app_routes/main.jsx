import React from 'react';
import { Link } from 'react-router-dom';
import Channels from '../channels/channels_container';
import Header from '../header/header_container';
import Chat from '../chat/chat_container';
import ServerMembers from '../server_members/server_members_container';
import Servers from '../servers/servers_container';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMembers: true };
    this.toggleShowMembers = this.toggleShowMembers.bind(this);
  }

  toggleShowMembers() {
    this.setState({showMembers: !this.state.showMembers});
  }
  render() {
    return (
        <div className="chat-container">
          <Header toggleShowMembers={this.toggleShowMembers}/>
          <div className="chat-main-container">
            <Chat />
            {this.state.showMembers ? <ServerMembers /> : null}
          </div>
        </div>
    )
  }
}

export default Main;