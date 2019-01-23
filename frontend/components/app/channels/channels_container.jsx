import { connect } from 'react-redux';
import Channels from './channels';
import { fetchChannels, createChannel } from '../../../actions/channel_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  // debugger
  return {
    currentUser: state.entities.users[state.session.id],
    currentServer: state.entities.servers[ownProps.match.params.serverId] || {},
    channels: Object.values(state.entities.channels),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels()),
    createChannel: channel => dispatch(createChannel(channel)),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Channels));
