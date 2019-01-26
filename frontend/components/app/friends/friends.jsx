import React from 'react';
import { Link } from 'react-router-dom';

class Friends extends React.Component {

  render() {
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
      </div>
    )
  }
}

export default Friends;