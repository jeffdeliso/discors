import React from 'react';
import DmChannel from './dm_channel';
import UserBar from '../user_bar/user_bar_container';
import { NavLink } from 'react-router-dom';

class DMChannels extends React.Component {
  render() {
    const that = this;
    const channels = this.props.channels.map((channel, idx) => {
      const nameArr = channel.name.split('-');
      let userId;
      
      if (nameArr[0] == this.props.currentUser.id) {
        userId = nameArr[1];
      } else {
        userId = nameArr[0];
      }

      return <DmChannel
        channel={channel}
        user={that.props.users[userId] || {}}
        key={idx}
        deleteDmChannel={() => this.props.deleteDmChannel(channel.id)}
        removeDmNotification={this.props.removeDmNotification}
      />;
    });

    return (
      <div className="right-main">
        <div className="channels">
          <NavLink to={`/channels/@me`}
            exact={true}
            className="friends-link"
            activeClassName="friends-link-active"
          >
            <svg className="friends-icon" width="16" height="16" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path><path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path></g></svg>
            <span className="server-name">Friends</span>
            {this.props.requestCount ? <div className="friends-request-counter">{this.props.requestCount}</div> : null}
          </NavLink>
          <div className="channel-scroll-wrapper">
            <div className="channel-overflow-container">
              <div className="channel-list">
                <div className="text-channels-label">
                  <div>
                    <h3 id="text-channels">DIRECT MESSAGES</h3>
                  </div>
                </div>
                {channels}
              </div>
            </div>
          </div>
          <UserBar />
        </div>
      </div>
    )
  }
}

export default DMChannels;