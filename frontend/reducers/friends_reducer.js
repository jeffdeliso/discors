import { RECEIVE_FRIENDS, RECEIVE_FRIEND, REMOVE_FRIEND } from "../actions/friends_actions";
import { union } from 'lodash';

const friendsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FRIENDS:
      return action.friends;
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