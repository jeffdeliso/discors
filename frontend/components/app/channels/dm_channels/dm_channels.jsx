import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Channel from '..//channel';
import Modal from 'react-modal';
import DmChannel from './dm_channel';
// import CreateChannelForm from './create_channel_form';

class DMChannels extends React.Component {

  componentDidMount() {
      this.props.fetchDmChannels();
  }

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

      return <DmChannel channel={channel} user={that.props.users[userId] || {}} key={idx} />;
    });

    return (
      <div className="right-main">
        <div className="channels">
          <div className="channel-header">
          </div>
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
          <div className="user-actions">
            <div className="icon-name-wrapper">
              <div className="user-icon" style={{ backgroundImage: `url(${this.props.currentUser.image_url})` }}></div>
              <div className="actions-username">{this.props.currentUser.username}</div>
            </div>
            <button className="gear" onClick={() => this.props.logout()}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DMChannels;
