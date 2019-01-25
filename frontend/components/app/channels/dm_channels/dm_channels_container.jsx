// import { fetchChannels, createChannel, removeChannelErrors } from '../../../actions/channel_actions';
import { withRouter } from 'react-router-dom';
import { logout } from '../../../../actions/session_actions';
import DMChannels from './dm_channels';
import { connect } from 'react-redux';
import { fetchDmChannels } from '../../../../actions/channel_actions';
// import { deleteServer } from '../../../actions/server_actions';


const mapStateToProps = (state, ownProps) => {

  return {
    currentUser: state.entities.users[state.session.id],
    // server: state.entities.servers[ownProps.match.params.serverId] || {},
    channels: Object.values(state.entities.channels),
    users: state.entities.users,
    // errors: state.errors.channel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDmChannels: () => dispatch(fetchDmChannels()),
    // createChannel: channel => dispatch(createChannel(channel)),
    logout: () => dispatch(logout()),
    // removeChannelErrors: () => dispatch(removeChannelErrors()),
    // deleteServer: (id) => dispatch(deleteServer(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DMChannels));
