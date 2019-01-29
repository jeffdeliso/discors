import React from 'react';
// import Channel from './channel';
import Modal from 'react-modal';
import CreateChannelForm from '../create_channel_form';
// import Tooltip from '../../modal/tooltip';
import VoiceChannel from './voice_channel';

class VoiceChannels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchVoiceChannels(this.props.match.params.serverId);
  }

  componentDidUpdate(prevProps) {
    const serverId = this.props.match.params.serverId
    if (prevProps.server.id != serverId) {
      this.props.fetchVoiceChannels(serverId);
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.props.removeChannelErrors();
  }

  updateContent(type) {
    this.setState({ content: type });
  }

  // removeServer() {
  //   this.props.deleteServer(this.props.server.id).then(() => (
  //     this.props.history.push('/channels/@me')
  //   ));
  // }

  render() {
    const that = this;
    const voiceChannels = this.props.voiceChannels.map((channel, idx) => {
      if (channel.server_id == that.props.match.params.serverId) {
        return <VoiceChannel
          server={that.props.server}
          channel={channel}
          key={idx}
          currentUserId={that.props.currentUserId}
          // deleteChannel={() => that.props.deleteChannel(channel.id)}
        />;
      } else {
        return null;
      }
    });

    return (
      <>
        <div className="text-channels-label">
          <div>
            <button className="text-channels-button" onClick={this.handleOpenModal}>+</button>
            <h3 id="text-channels">Voice Channels</h3>
          </div>
        </div>
        {voiceChannels}

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
            createChannel={this.props.createVoiceChannel}
            closeModal={this.handleCloseModal}
            errors={this.props.errors}
            text="VOICE"
          />
        </Modal>
      </>
    )
  }
}

export default VoiceChannels;
