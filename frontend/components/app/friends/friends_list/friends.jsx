import React from 'react';
import Friend from '../friend';

class Friends extends React.Component {
  componentDidMount() {
    this.props.fetchFriends();
  }
  render() {
    const friends = this.props.friends.map((friend, idx) => {
      return <Friend
        user={friend}
        key={idx}
        reject={() => this.props.deleteFriend(friend.id)}
        createDmChannel={this.props.createDmChannel}
        status='Online'
      />;
    });

    return (
      <div className="friends-scroll-wrapper">
        <ul>
          {friends}
        </ul>
      </div>
    )
  }
}

export default Friends;