import React from 'react';

class FriendsHeader extends React.Component {

  render() {
    return (
      <header className="chat-header">
        <ul className="friends-button-container">
          <li className={this.props.tab === 'all' ? "friends-header-button-active" : "friends-header-button"}
            onClick={() => this.props.changeTab('all')}
          >All</li>
          <li className={this.props.tab === 'pending' ? "friends-header-button-active" : "friends-header-button"}
            onClick={() => this.props.changeTab('pending')}
          >Pending</li>
        </ul>
      </header>
    )
  }
}

export default FriendsHeader;