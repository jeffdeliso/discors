import React from 'react';
import Friend from '../friend';

class PendingFriends extends React.Component {
  render() {
    const incomingFriends = this.props.incomingRequests.map((request, idx) => {
      const user = this.props.users[request.user_id];
      return <Friend
        user={user}
        key={idx}
        status={'Incoming friend request'}
        accept={() => this.props.acceptFriendRequest(request)}
        reject={() => this.props.deleteFriendRequest(request)}
        createDmChannel={this.props.createDmChannel}
        first={idx === 0}
        currentUser={this.props.currentUser}
        servers={this.props.servers}
      />;
    });

    const outgoingFriends = this.props.outgoingRequests.map((request, idx) => {
      const user = this.props.users[request.friend_id];
      return <Friend
        user={user}
        key={idx}
        status={'Outgoing friend request'}
        accept={() => this.props.acceptFriendRequest(request)}
        reject={() => this.props.deleteFriendRequest(request)}
        createDmChannel={this.props.createDmChannel}
        first={idx === 0 && incomingFriends.empty}
        currentUser={this.props.currentUser}
        servers={this.props.servers}
      />;
    });

    return (
      <div className="friends-scroll-wrapper">
        <ul>
          {incomingFriends}
          {outgoingFriends}
          {incomingFriends.length === 0 && outgoingFriends.length === 0 ?
            <div className="empty-container">
              <div className="pending empty"></div>
              <h4>There are no pending friend requests. Here's a Wumpus for now.</h4>
            </div>
            : null}
        </ul>
      </div>
    )
  }
}

export default PendingFriends;