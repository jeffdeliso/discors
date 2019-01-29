import { connect } from 'react-redux';
import VoiceChannels from './voice_channels';
import { withRouter } from 'react-router-dom';
import { fetchVoiceChannels, createVoiceChannel, deleteVoiceChannel } from '../../../../actions/voice_channel_actions';
import { removeChannelErrors } from '../../../../actions/channel_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    server: state.entities.servers[ownProps.match.params.serverId] || {},
    voiceChannels: Object.values(state.entities.voiceChannels),
    errors: state.errors.channel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVoiceChannels: serverId => dispatch(fetchVoiceChannels(serverId)),
    createVoiceChannel: voiceChannel => dispatch(createVoiceChannel(voiceChannel)),
    removeChannelErrors: () => dispatch(removeChannelErrors()),
    deleteVoiceChannel: (id) => dispatch(deleteVoiceChannel(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoiceChannels));