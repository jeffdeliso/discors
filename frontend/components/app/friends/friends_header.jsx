import React from 'react';
import { connect } from 'react-redux';

function FriendsHeader(props) {
  return (
    <header className="chat-header">
      <ul className="friends-button-container">
        <li className={props.tab === 'all' ? "friends-header-button-active" : "friends-header-button"}
          onClick={() => props.changeTab('all')}
        >All</li>
        <li className={props.tab === 'online' ? "friends-header-button-active" : "friends-header-button"}
          onClick={() => props.changeTab('online')}
        >Online</li>
        <li className={props.tab === 'pending' ? "friends-header-button-active" : "friends-header-button"}
          onClick={() => props.changeTab('pending')}
        >Pending
          {props.requestCount ? <div className="friends-request-header-counter">{props.requestCount}</div> : null}
        </li>
      </ul>
    </header>
  )
}


const mapStateToProps = (state) => {
  const incomingRequests = Object.values(state.entities.friendRequests).filter((request) => {
    return request.friend_id === state.session.id;
  }).length;

  return {
    requestCount: incomingRequests,
  };
};

export default connect(mapStateToProps)(FriendsHeader);