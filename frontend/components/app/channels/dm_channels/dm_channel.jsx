import React from 'react';
import { NavLink } from 'react-router-dom';

class DmChannel extends React.Component {
  render() {
    return (
      <NavLink to={`/channels/@me/${this.props.channel.id}`}
        className="channel"
        activeClassName="selected"
        style={{height: '40px', marginLeft: 0}}
      >
        <div className="server-member-img" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
        <div className="channel-name">{this.props.user.username}</div>
      </NavLink >
    )
  };
};

export default DmChannel;