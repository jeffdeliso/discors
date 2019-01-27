import React from 'react';
import { NavLink } from 'react-router-dom';

class DmChannel extends React.Component {
  render() {
    return (
      <NavLink to={`/channels/@me/${this.props.channel.id}`}
        className="channel"
        activeClassName="selected"
        style={{height: '40px'}}
      >
        <div className="server-member-img" style={{ backgroundImage: `url(${this.props.user.image_url})`, marginLeft: 0 }}>
          <div
            className="server-member-status-indicator"
            style={this.props.user.online ? { backgroundColor: '#43b581' } : { backgroundColor: '#747f8d' }}
          ></div>
        </div>
        <div className="channel-name">{this.props.user.username}</div>
      </NavLink >
    )
  };
};

export default DmChannel;