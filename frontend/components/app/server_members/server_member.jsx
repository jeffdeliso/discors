import React from 'react';
import { Link } from 'react-router-dom';

class ServerMember extends React.Component {

  render() {
    return (
      <div className="server-member">
        <div className="server-member-img" style={this.props.user.image_url ? {backgroundImage: `image-url(${this.props.user.image_url})`} : {}}></div>
        <span>{this.props.user.username}</span>
      </div>
    )
  }
}

export default ServerMember;