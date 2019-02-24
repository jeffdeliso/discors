import React from 'react';
import Header from '../header/header/header_container';
import Chat from '../chat/chat/chat_container';
import ServerMembers from '../server_members/server_members/server_members_container';

class ServerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMembers: true, classText: 'members-transition-left' };
    this.toggleShowMembers = this.toggleShowMembers.bind(this);
  }

  toggleShowMembers() {
    const { showMembers } = this.state;

    if (showMembers) {
      this.setState({ classText: "members-transition-right" });
      setTimeout(() => this.setState({ showMembers: !showMembers }), 200);
    } else {
      this.setState({ showMembers: !showMembers });
      setTimeout(() => this.setState({ classText: 'members-transition-left' }), 1);
    }
  }

  render() {
    return (
      <div className="chat-container">
        <Header toggleShowMembers={this.toggleShowMembers} />
        <div className="chat-main-container">
          <Chat />
          {this.state.showMembers ? <ServerMembers classText={this.state.classText} /> : null}
        </div>
      </div>
    )
  }
}

export default ServerMain;