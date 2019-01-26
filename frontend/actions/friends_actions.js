import * as APIUtil from '../util/friends_api_util';
import { receiveCurrentUser } from './session_actions';


export const createFriendRequest= (friendRequest) => dispatch => (
  APIUtil.createFriendRequest(friendRequest).then(currentUser => (
    dispatch(receiveCurrentUser(currentUser))
  ))
);
