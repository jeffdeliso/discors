import React from 'react';
import { Link } from 'react-router-dom';

class ServerMembers extends React.Component {

  render() {
    return (
      <div className="server-members">
        <div className="server-members-scroll">
          <div className="server-members-container">
            <h3>ADMIN</h3>
            <div className="server-member">
              <div className="server-member-img"></div>
              <span>deliso346</span>
            </div>
            <h3>MEMBERS</h3>
            <div className="server-member">
              <div className="server-member-img"></div>
              <span>deliso346</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ServerMembers;