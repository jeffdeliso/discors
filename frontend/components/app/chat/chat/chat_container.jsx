import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chat from './chat';
import { removeDmNotification } from '../../../../actions/notification_actions';
import { removeChannel } from '../../../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  const channelId = ownProps.match.params.channelId;
  const channel = state.entities.channels[channelId] || {};
  const server = state.entities.servers[channel.server_id] || {};
  
  return {
    currentUser: state.entities.users[state.session.id],
    channelId,
    users: state.entities.users,
    channel,
    server,
    loading: state.ui.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDmNotification: channelId => dispatch(removeDmNotification(channelId)),
    removeChannel: channelId => dispatch(removeChannel(channelId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
