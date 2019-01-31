import React from 'react';
import { NavLink } from 'react-router-dom';
import Tooltip from '../../modal/tooltip';

class DmChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleMouseEnter() {
    this.setState({ active: true });
  }

  handleMouseLeave() {
    this.setState({ active: false });
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteDmChannel();
  }

  render() {
    return (
      <NavLink to={`/channels/@me/${this.props.channel.id}`}
        className="channel"
        activeClassName="selected"
        style={{ height: '40px' }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="server-member-img" style={{ backgroundImage: `url(${this.props.user.image_url})`, marginLeft: 0 }}>
          <div
            className="server-member-status-indicator"
            style={this.props.user.online ? { backgroundColor: '#43b581' } : { backgroundColor: '#747f8d' }}
          ></div>
        </div>
        <div className="channel-name">{this.props.user.username}</div>
        {this.state.active ? <button className="delete-channel-button" onClick={this.handleDelete}></button> : null}
      </NavLink >
    )
  };
};

export default DmChannel;