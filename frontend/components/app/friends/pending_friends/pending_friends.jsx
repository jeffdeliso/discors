import React from 'react';
import Friend from '../friend';

class PendingFriends extends React.Component {

  componentDidMount() {
    this.props.fetchFriendRequests();
  }

  render() {
    const outgoingFriends = this.props.outgoingRequests.map((request, idx) => {
      const user = this.props.users[request.friend_id];
      return <Friend
        user={user}
        key={idx}
        status={'Outgoing friend request'}
        accept={() => this.props.acceptFriendRequest(request)}
        reject={() => this.props.deleteFriendRequest(request)}
      />;
    });

    const incomingFriends = this.props.incomingRequests.map((request, idx) => {
      const user = this.props.users[request.user_id];
      return <Friend
        user={user}
        key={idx}
        status={'Incoming friend request'}
        accept={() => this.props.acceptFriendRequest(request)}
        reject={() => this.props.deleteFriendRequest(request)}
      />;
    });

    return (
      <div className="friends-scroll-wrapper">
          <ul>
            {incomingFriends}
            {outgoingFriends}
          </ul>
      </div>
    )
  }
}

export default PendingFriends;