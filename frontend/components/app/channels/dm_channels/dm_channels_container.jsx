import { withRouter } from 'react-router-dom';
import { logout } from '../../../../actions/session_actions';
import DMChannels from './dm_channels';
import { connect } from 'react-redux';
import { fetchDmChannels } from '../../../../actions/channel_actions';


const mapStateToProps = (state, ownProps) => {

  return {
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels).filter(channel => !channel.server_id),
    users: state.entities.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDmChannels: () => dispatch(fetchDmChannels()),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DMChannels));
