import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

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
    const channelId = this.props.channel.id;
    const notification = document.getElementById(`dm-notification-${channelId}`);
    
    if (notification) {
      notification.className = 'dm-notification';
      setTimeout(() => this.props.removeDmNotification(channelId), 200);
    }
    
    const that = this;
    this.props.deleteDmChannel().then((action) => {
      if (action.channelId == that.props.match.params.channelId) {
        that.props.history.push(`/channels/@me`);
      }
    });
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

export default withRouter(DmChannel);