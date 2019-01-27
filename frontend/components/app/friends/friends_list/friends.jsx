import React from 'react';
import Friend from './friend';

class Friends extends React.Component {
  componentDidMount() {
    this.props.fetchFriends();
  }
  render() {
    const friends = this.props.friends.map((friend, idx) => {
      return <Friend user={friend} key={idx} deleteFriend={this.props.deleteFriend}/>;
    });
    return (
      <div className="friends-list">
        <div className="friends-table-header">
          <div className="friends-column friends-name">Name</div>
          <div className="friends-column-separator"></div>
          <div className="friends-column friends-status">Status</div>
          <div className="friends-column-separator"></div>
          <div className="friends-column friends-servers"></div>
          <div className="friends-column-separator"></div>
          <div className="friends-actions"></div>
        </div>
        {friends}
      </div>
    )
  }
}

export default Friends;