import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER, RECEIVE_CURRENT_USER_DATA, RECEIVE_USER } from '../../actions/session_actions';
import { RECEIVE_USERS, REMOVE_SERVER } from '../../actions/server_actions';
import { RECEIVE_FRIENDS } from '../../actions/friends_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER_DATA:
      return merge({}, state, action.currentUserData.users);
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    case RECEIVE_FRIENDS:
      return merge({}, state, action.friendData.users);
    case REMOVE_SERVER:
      const newState = merge({}, state);
      newState[action.userId].servers = newState[action.userId].servers.filter(serverId => {
        return serverId !== action.serverId;
      });
      return newState;
    default:
      return state;
  }
};

export default usersReducer;

