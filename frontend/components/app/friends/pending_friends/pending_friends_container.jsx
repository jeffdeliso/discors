import { connect } from 'react-redux';
import PendingFriends from './pending_friends';
import { fetchFriendRequests, acceptFriendRequest, deleteFriendRequest } from '../../../../actions/friends_actions';

const mapStateToProps = (state, ownProps) => {
  const outgoingRequests = Object.values(state.entities.friendRequests).filter((request) => {
    return request.user_id === state.session.id;
  });

  const incomingRequests = Object.values(state.entities.friendRequests).filter((request) => {
    return request.friend_id === state.session.id;
  });

  return {
    users: state.entities.users,
    incomingRequests,
    outgoingRequests,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFriendRequests: () => dispatch(fetchFriendRequests()),
    acceptFriendRequest: (request) => dispatch(acceptFriendRequest(request)),
    deleteFriendRequest: (request) => dispatch(deleteFriendRequest(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingFriends);
