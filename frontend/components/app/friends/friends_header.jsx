import React from 'react';
import { Link } from 'react-router-dom';

class FriendsHeader extends React.Component {

  render() {
    return (
      <header className="chat-header">
        <ul className="friends-button-container">
          <li className="friends-header-button-active">All</li>
          <li className="friends-header-button">Pending</li>
        </ul>
      </header >
    )
  }
}

export default FriendsHeader;