import merge from 'lodash/merge';
import { RECEIVE_REQUESTS, REMOVE_REQUEST, RECEIVE_REQUEST } from '../../actions/friends_actions';
import { RECEIVE_CURRENT_USER_DATA } from '../../actions/session_actions';

const friendRequestsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER_DATA:
      return action.currentUserData.friend_requests || {};
    case RECEIVE_REQUESTS:
      return action.friendRequests || {};
    case RECEIVE_REQUEST:
      return merge({}, state, { [action.friendRequest.id]: action.friendRequest });
    case REMOVE_REQUEST:
      const newState = merge({}, state);
      delete newState[action.requestId];
      return newState;
    default:
      return state;
  }
};

export default friendRequestsReducer;
