import React from 'react';
import Friend from '../friend';

class Friends extends React.Component {
  render() {
    const friends = this.props.friends.map((friend, idx) => {
      return <Friend
        user={friend}
        key={idx}
        reject={() => this.props.deleteFriend(friend.id)}
        createDmChannel={this.props.createDmChannel}
        status={friend.online ? 'Online' : 'Offline'}
        first={idx === 0}
        currentUser={this.props.currentUser}
        servers={this.props.servers}
      />;
    });

    return (
      <div className="friends-scroll-wrapper">
        <ul>
          {friends}
          {friends.length === 0 ? (this.props.allFriends ? (
            <div className="empty-container">
              <div className="no-friends empty"></div>
              <h4>Wumpus has no friends. You could though!</h4>
            </div>
          ) : (
              <div className="empty-container">
                <div className="online empty"></div>
                <h4>No one's around to play with Wumpus.</h4>
              </div>
            )) : null}
        </ul>
      </div>
    )
  }
}

export default Friends;