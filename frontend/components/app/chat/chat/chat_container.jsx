import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chat from './chat';
import { removeDmNotification } from '../../../../actions/notification_actions';

const mapStateToProps = (state, ownProps) => {
  const channelId = ownProps.match.params.channelId;
  return {
    currentUser: state.entities.users[state.session.id],
    channelId,
    users: state.entities.users,
    channel: state.entities.channels[channelId] || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDmNotification: channelId => dispatch(removeDmNotification(channelId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));