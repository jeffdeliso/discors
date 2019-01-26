import { connect } from 'react-redux';
import PendingFriends from './pending_friends';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.id];
  const outgoingFriends = currentUser.outgoing_friend_requests.map((id) => {
    return state.entities.users[id];
  });
  const incomingFriends = currentUser.incoming_friend_requests.map((id) => {
    return state.entities.users[id];
  });
  return {
    currentUser: state.entities.users[state.session.id],
    incomingFriends,
    outgoingFriends,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingFriends);
