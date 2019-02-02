import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER, RECEIVE_CURRENT_USER_DATA } from '../actions/session_actions';
import { RECEIVE_USERS } from '../actions/server_actions';
import { RECEIVE_FRIENDS } from '../actions/friends_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER_DATA:
      return action.currentUserData.users;
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    case RECEIVE_FRIENDS:
      return merge({}, state, action.friendData.users);
    default:
      return state;
  }
};

export default usersReducer;
