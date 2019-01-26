import React from 'react';
import FriendsHeader from '../friends/friends_header';
import Friends from '../friends/friends_list/friends_container';
import PendingFriends from '../friends/pending_friends/pending_friends_container';


class FriendsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'all' };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tabName) {
    this.setState({ tab: tabName });
  }
  
  render() {
    let component;
    if (this.state.tab === 'all') {
      component = <Friends />
    } else if (this.state.tab === 'pending') {
      component = <PendingFriends />
    }
    return (
      <>
        <div className="chat-container">
          <FriendsHeader changeTab={this.changeTab} tab={this.state.tab}/>
          <div className="chat-main-container">
          {component}
          </div>
        </div>
      </>
    )
  }
}


export default FriendsMain;
