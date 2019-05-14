import React from 'react';
import Friend from '../friend';

function PendingFriends(props) {
  const incomingFriends = props.incomingRequests.map((request, idx) => {
    const user = props.users[request.user_id];
    return <Friend
      user={user}
      key={idx}
      status={'Incoming friend request'}
      accept={() => props.acceptFriendRequest(request)}
      reject={() => props.deleteFriendRequest(request)}
      createDmChannel={props.createDmChannel}
      first={idx === 0}
      currentUser={props.currentUser}
      servers={props.servers}
    />;
  });

  const outgoingFriends = props.outgoingRequests.map((request, idx) => {
    const user = props.users[request.friend_id];
    return <Friend
      user={user}
      key={idx}
      status={'Outgoing friend request'}
      accept={() => props.acceptFriendRequest(request)}
      reject={() => props.deleteFriendRequest(request)}
      createDmChannel={props.createDmChannel}
      first={idx === 0 && incomingFriends.empty}
      currentUser={props.currentUser}
      servers={props.servers}
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

export default PendingFriends;