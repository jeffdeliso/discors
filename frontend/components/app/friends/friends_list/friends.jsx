import React from 'react';
import Friend from '../friend';

function Friends(props) {
  const friends = props.friends.map((friend, idx) => {
    return <Friend
      user={friend}
      key={idx}
      reject={() => props.deleteFriend(friend.id)}
      createDmChannel={props.createDmChannel}
      status={friend.online ? 'Online' : 'Offline'}
      first={idx === 0}
      currentUser={props.currentUser}
      servers={props.servers}
    />;
  });

  return (
    <div className="friends-scroll-wrapper">
      <ul>
        {friends}
        {friends.length === 0 ? (props.allFriends ? (
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

export default Friends;