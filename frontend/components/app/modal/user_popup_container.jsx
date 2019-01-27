import { connect } from 'react-redux';
import { createDmChannel } from '../../../actions/channel_actions';
import { createFriendRequest } from '../../../actions/friends_actions';
import UserPopup from './user_popup';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    friendRequests: state.entities.friendRequests,
    friends: state.entities.friends,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createDmChannel: userId => dispatch(createDmChannel(userId)),
    createFriendRequest: request => dispatch(createFriendRequest(request))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPopup));
