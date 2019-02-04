import { RECEIVE_FRIENDS, RECEIVE_FRIEND, REMOVE_FRIEND } from "../../actions/friends_actions";
import { union } from 'lodash';
import { RECEIVE_CURRENT_USER_DATA } from "../../actions/session_actions";

const friendsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER_DATA:
      return action.currentUserData.friends;
    case RECEIVE_FRIENDS:
      return action.friendData.friends;
    case RECEIVE_FRIEND:
      return union([], state, action.friend);
    case REMOVE_FRIEND:
      const newState = union([], state);
      return newState.filter((friendId) => (
        friendId !== action.friendId
      ));
    default:
      return state;
  }
};

export default friendsReducer;
