import React from 'react';
import Channel from './channel';
import Modal from 'react-modal';
import CreateChannelForm from './create_channel_form';
import Tooltip from '../modal/tooltip';
import VoiceChannels from './voice_channels/voice_channels_container';
import UserBar from './user_bar_container';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, showUserModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    // this.handleOpenUserModal = this.handleOpenUserModal.bind(this);
    // this.handleCloseUserModal = this.handleCloseUserModal.bind(this);
    this.removeServer = this.removeServer.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriends();
    this.props.fetchFriendRequests();
    if (this.props.match.params.serverId) {
      this.props.fetchChannels(this.props.match.params.serverId).then((action) => this.props.history.push(`/channels/${Object.values(action.channels)[0].server_id}/${Object.values(action.channels)[0].id}`));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.server.id != this.props.match.params.serverId) {
      this.props.fetchChannels(this.props.match.params.serverId).then((action) => this.props.history.push(`/channels/${Object.values(action.channels)[0].server_id}/${Object.values(action.channels)[0].id}`));
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.props.removeChannelErrors();
  }

  // handleOpenUserModal() {
  //   this.setState({ showUserModal: true });
  // }

  // handleCloseUserModal() {
  //   this.setState({ showUserModal: false });
  // }

  // updateContent(type) {
  //   this.setState({ content: type });
  // }

  removeServer() {
    this.props.deleteServer(this.props.server.id).then(() => (
      this.props.history.push('/channels/@me')
    ));
  }

  render() {
    const that = this;
    const channels = this.props.channels.map((channel, idx) => {
      if (channel.server_id == that.props.match.params.serverId) {
        return <Channel
          server={that.props.server}
          channel={channel}
          key={idx}
          currentUser={that.props.currentUser}
          deleteChannel={() => that.props.deleteChannel(channel.id)}
        />;
      } else {
        return null;
      }
    });

    return (
      <div className="right-main">
        <div className="channels">
          <div className="channel-header">
            <span className="server-name">{this.props.server.name}</span>
            <Tooltip component={
              <svg width="18" height="18" className="leave-server-button" onClick={this.removeServer}><g fill="none" fillRule="evenodd"><path d="M0 0h18v18H0"></path><path stroke="#FFF" d="M4.5 4.5l9 9" strokeLinecap="round"></path><path stroke="#FFF" d="M13.5 4.5l-9 9" strokeLinecap="round"></path></g></svg>
            }
              position="left center"
              text={this.props.server.admin_id === this.props.currentUser.id ? 'Delete Server' : 'Unsubscribe'}
            />
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
          {/* <div className="user-actions">
            <div className="icon-name-wrapper">
              <div className="user-icon" style={{ backgroundImage: `url(${this.props.currentUser.image_url})` }} onClick={this.handleOpenUserModal} ></div>
              <div className="actions-username">{this.props.currentUser.username}</div>
            </div>
            <Tooltip component={
              <button className="gear" onClick={() => this.props.logout()}>
                <i className="fas fa-sign-out-alt"></i>
              </button>
            }
              position="top center"
              text="Logout"
            />
          </div> */}
          <UserBar />
        </div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          style={{
            overlay: {
              backgroundColor: 'rgb(0, 0, 0, 0.85)',
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
        {/* <Modal
          isOpen={this.state.showUserModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseUserModal}
          style={{
            overlay: {
              backgroundColor: 'rgb(0, 0, 0, 0.7)',
              zIndex: 99,
            },
            content: {
              height: 'fit-content',
              width: '500px',
              padding: 0,
              borderRadius: '5px',
              margin: 'auto',
              boxShadow: '0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#37393f',
              border: 'none'
            }
          }}
        >
        <EditUserForm 
          closeModal={this.handleCloseUserModal} 
          errors={this.props.sessionErrors}
          currentUser={this.props.currentUser}
          editUser={this.props.editUser}
        />
        </Modal> */}
      </div>
    )
  }
}

export default Channels;
