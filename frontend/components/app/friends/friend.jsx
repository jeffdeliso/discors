import React from 'react';
import { withRouter } from 'react-router-dom';
import Tooltip from '../modal/tooltip';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickParent = this.handleClickParent.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  }

  handleClickParent() {
    this.props.createDmChannel(this.props.user.id).then((action) => this.props.history.push(`/channels/@me/${action.channel.id}`));
  }

  handleReject(e) {
    e.stopPropagation();
    this.props.reject();
  }

  handleAccept(e) {
    e.stopPropagation();
    this.props.accept();
  }

  render() {
    return (
      <li className="friend-container" onClick={this.handleClickParent}>
        <div className="friend-name-container">
          <div className="friend-icon" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
          <h4>{this.props.user.username}</h4>
        </div>
        <div className="friend-status-container">
          <div
            className="friends-status-indicator"
            style={this.props.user.online ? { backgroundColor: '#43b581' } : { backgroundColor: '#747f8d' }}
          ></div>
          <h4>{this.props.status}</h4>
        </div>
        <div className="friend-accept-reject">
          {this.props.status === 'Incoming friend request' ?
            <Tooltip component={
              <button className="accept-friend" onClick={this.handleAccept}></button>
            }
              position="top center"
              text='Accept'
            />
            : null}
          <Tooltip component={
            <button
              className={this.props.status.includes('request') ? "reject-friend" : "remove-friend"}
              onClick={this.handleReject}
            ></button>
          }
            position="top center"
            text={this.props.status.includes('request') ? (this.props.status.includes('Outgoing') ? "Cancel" : "Reject") : "Remove Friend"}
          />

        </div>
      </li>
    )
  }
}

export default withRouter(Friend);