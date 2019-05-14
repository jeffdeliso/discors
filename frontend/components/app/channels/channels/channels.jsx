import React from 'react';
import Channel from './channel';
import Modal from 'react-modal';
import CreateChannelForm from '../create_channel_form';
import Tooltip from '../../modal/tooltip';
import VoiceChannels from '../voice_channels/voice_channels_container';
import UserBar from '../user_bar/user_bar_container';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, showUserModal: false, active: false };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.removeServer = this.removeServer.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ active: true });
  }

  handleMouseLeave() {
    this.setState({ active: false });
  }

  componentDidMount() {
    const serverId = this.props.match.params.serverId;
    if (serverId) {
      this.props.fetchChannels(parseInt(serverId), this.props.currentUser.id).then(() => {}, () => (
        this.props.history.push('/channels/@me')
      ));
    }
  }

  componentDidUpdate(prevProps) {
    const serverId = this.props.match.params.serverId;
    if (prevProps.server.id && prevProps.server.id != serverId) {
      this.props.fetchChannels(parseInt(serverId), this.props.currentUser.id).then(() => {}, () => (
        this.props.history.push('/channels/@me')
      ));
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.props.removeChannelErrors();
  }

  removeServer() {
    this.props.deleteServer(this.props.server.id, this.props.currentUser.id).then(() => (
      this.props.history.push('/channels/@me')
    ));
  }

  render() {
    const that = this;
    const channels = this.props.channels.map((channel, idx) => {
      return <Channel
        server={that.props.server}
        channel={channel}
        key={idx}
        currentUser={that.props.currentUser}
        deleteChannel={() => that.props.deleteChannel(channel.id)}
      />;
    });

    return (
      <div className="right-main">
        <div className="channels">
          <div
            className="channel-header"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <span className="server-name">{this.props.server.name}</span>
            {this.state.active ?
              (<Tooltip component={
                <button className="delete-channel-button" onClick={this.removeServer}></button>
              }
                position="bottom right"
                text={this.props.server.admin_id === this.props.currentUser.id ? 'Delete Server' : 'Unsubscribe'}
              />) : null}
          </div>
          <div className="channel-scroll-wrapper">
            <div className="channel-overflow-container">
              <div className="channel-list">
                <div className="text-channels-label">
                  <div>
                    <button className="text-channels-button" onClick={this.handleOpenModal}>+</button>
                    <h3 id="text-channels">Text Channels</h3>
                  </div>
                </div>
                {channels}
                <VoiceChannels />
              </div>
            </div>
          </div>
          <UserBar />
        </div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          closeTimeoutMS={150}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 99,
            },
            content: {
              height: '382px',
              width: '440px',
              padding: 0,
              borderRadius: '5px',
              margin: 'auto',
              boxShadow: '0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#36393f',
              border: 'none'
            }
          }}
        >
          <CreateChannelForm
            server={this.props.server}
            createChannel={this.props.createChannel}
            closeModal={this.handleCloseModal}
            errors={this.props.errors}
            text="TEXT"
          />
        </Modal>
      </div>
    )
  }
}

export default Channels;
