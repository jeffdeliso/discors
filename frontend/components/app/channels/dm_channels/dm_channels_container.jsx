import { withRouter } from 'react-router-dom';
import { logout } from '../../../../actions/session_actions';
import DMChannels from './dm_channels';
import { connect } from 'react-redux';
import { fetchDmChannels, deleteDmChannel } from '../../../../actions/channel_actions';
import { removeDmNotification } from '../../../../actions/notification_actions';

const mapStateToProps = (state) => {
  const incomingRequests = Object.values(state.entities.friendRequests).filter((request) => {
    return request.friend_id === state.session.id;
  }).length;

  return {
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels).filter(channel => !channel.server_id),
    users: state.entities.users,
    requestCount: incomingRequests,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDmChannels: () => dispatch(fetchDmChannels()),
    logout: () => dispatch(logout()),
    deleteDmChannel: id => dispatch(deleteDmChannel(id)),
    removeDmNotification: channelId => dispatch(removeDmNotification(channelId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DMChannels));
