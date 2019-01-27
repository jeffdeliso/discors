import React from 'react';
import { Link } from 'react-router-dom';
import ServerMember from './server_member';

class ServerMembers extends React.Component {

  componentDidMount() {
    this.props.fetchMembers(this.props.match.params.serverId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.server.id != this.props.match.params.serverId) {
      this.props.fetchMembers(this.props.match.params.serverId);
    }
  }

  render() {
    const admin = this.props.members.find((member) => {
      return member.id === this.props.server.admin_id;
    }) || {};
    
    const adminEl = <ServerMember
      user={admin}
    />;

    const members = this.props.members.map((member, idx) => {
      if (member.id === this.props.server.admin_id) {
        return null
      } else {
        return <ServerMember key={idx}
          user={member}
        />;
      }
    });
    return (
      <div className="server-members" >
        <div className="server-members-scroll">
          <div className="server-members-container">
            <h3>ADMIN</h3>
            {adminEl}
            <h3>MEMBERS</h3>
            {members}
          </div>
        </div>
      </div>
    )
  }
}

export default ServerMembers;