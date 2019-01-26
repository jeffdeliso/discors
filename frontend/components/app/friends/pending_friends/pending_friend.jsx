import React from 'react';

class PendingFriend extends React.Component {

  render() {
    return (
      <li className="friend-container">
        <div className="friend-name-container">
          <div className="friend-icon" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
          <h4>{this.props.user.username}</h4>
        </div>
        <div className="friend-status-container">
          <h4>{`${this.props.status} Friend Request`}</h4>
        </div>
        <div className="friend-accept-reject">
          {this.props.status === 'Incoming' ? <button className="accept-friend" onClick={this.props.accept}></button> : null}
          <button className="reject-friend" onClick={this.props.reject}></button>
        </div>
      </li>
    )
  }
}

export default PendingFriend;