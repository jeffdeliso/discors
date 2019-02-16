import React from 'react';
import Popup from 'reactjs-popup';

class UserPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  handleClick() {
    this.props.createDmChannel(this.props.user.id).then((action) => this.props.history.push(`/channels/@me/${action.channel.id}`));
  }

  addFriend() {
    this.props.createFriendRequest({ friend_id: this.props.user.id });
  }

  render() {
    const friendRequestsArray = this.props.friendRequests.map((request) => {
      if (request.user_id === this.props.currentUserId) {
        return request.friend_id;
      } else {
        return request.user_id;
      }
    });

    const showFriendButtonArray = friendRequestsArray.concat(this.props.friends);
    showFriendButtonArray.push(this.props.currentUserId);

    const showFriendButton = !showFriendButtonArray.includes(this.props.user.id);

    let offsetY = this.props.offsetY;
    if (offsetY === -90) {
      if (!showFriendButton) offsetY += 14;
      if (this.props.currentUserId === this.props.user.id) offsetY += 14;
    } else if (offsetY === 60) {
      if (!showFriendButton) offsetY -= 16;
      if (this.props.currentUserId === this.props.user.id) offsetY -= 16;
    } else {
      if (!showFriendButton) offsetY -= 17;
      if (this.props.currentUserId === this.props.user.id) offsetY -= 17;
    }
    
    return (
      <Popup trigger={this.props.component}
        arrow={false}
        position={this.props.position}
        closeOnDocumentClick
        onOpen={this.props.onOpen}
        on="click"
        offsetX={this.props.offsetX || 0}
        offsetY={offsetY || 0}
        overlayStyle={{
          zIndex: 98,
        }}
        contentStyle={{
          borderRadius: '5px',
          boxShadow: '0 2px 10px 0 rgba(0, 0, 0, .2), 0 0 0 1px rgba(32, 34, 37, .6)',
          overflow: 'hidden',
          width: '200px',
          whiteSpace: 'nowrap',
          fontFamily: 'main3',
          color: '#fff',
          border: 'none',
          fontSize: '14px',
          display: 'flex',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'black',
          overflow: 'auto',
          zIndex: 99,
          transition: 'transform 200ms ease-in-out'
        }}
      >
        <div className="user-popup">
          <div className="user-popup-top">
            <div className="user-popup-img" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}>
              <div className="popup-online-indicator" style={this.props.user.online ? { backgroundColor: '#43b581', boxShadow: 'inset 0 0 0 2px rgba(180,225,205,.6)' } : { backgroundColor: '#747f8d', boxShadow: 'inset 0 0 0 2px rgba(199, 204, 209, .6)'}}></div>
            </div>
            <h5>{this.props.user.username}</h5>
          </div>
          <div className="user-popup-bottom">
            {this.props.user.id === this.props.currentUserId || !this.props.showMessageButton ? null : <button className="user-popup-button"
              onClick={this.handleClick}
              id="dm-button"
            >Message</button>}
            {showFriendButton ? <button className="user-popup-button"
              onClick={this.addFriend}
            >Add Friend</button> : null}
          </div>
        </div>
      </Popup>
    );
  }
}

export default UserPopup; 