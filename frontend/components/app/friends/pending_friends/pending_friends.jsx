import React from 'react';
import PendingFriend from './pending_friend';

class PendingFriends extends React.Component {

  render() {
    const incomingFriends = this.props.incomingFriends.map((friend, idx) => {
      return <PendingFriend user={friend} key={idx} status={'Incoming Friend Request'}/>
    });
    const outgoingFriends = this.props.outgoingFriends.map((friend, idx) => {
      return <PendingFriend user={friend} key={idx} status={'Outgoing Friend Request'}/>
    });
    return (
      <div className="friends-list">
        <div className="friends-table-header">
          <div className="friends-column friends-name">Name</div>
          <div className="friends-column-separator"></div>
          <div className="friends-column friends-status">Status</div>
          <div className="friends-column-separator"></div>
          <div className="friends-column friends-servers">Mutual Servers</div>
          <div className="friends-column-separator"></div>
          <div className="friends-actions"></div>
        </div>
        {incomingFriends}
        {outgoingFriends}
      </div>
    )
  }
}

export default PendingFriends;
