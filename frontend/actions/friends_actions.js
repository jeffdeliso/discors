import * as APIUtil from '../util/friends_api_util';
import { receiveUsers } from './server_actions';

export const RECEIVE_REQUESTS = 'RECEIVE_REQUESTS';
export const RECEIVE_REQUEST = 'RECEIVE_REQUEST';
export const REMOVE_REQUEST = 'REMOVE_REQUEST';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const RECEIVE_FRIEND = 'RECEIVE_FRIEND';


export const receiveFriendRequests = friendRequests => ({
  type: RECEIVE_REQUESTS,
  friendRequests
});

export const receiveFriends = friendData => ({
  type: RECEIVE_FRIENDS,
  friendData
});

export const receiveFriend = friendId => ({
  type: RECEIVE_FRIEND,
  friend: [friendId]
});

export const receiveFriendRequest = friendRequest => ({
  type: RECEIVE_REQUEST,
  friendRequest
});

export const removeFriendRequest = requestId => ({
  type: REMOVE_REQUEST,
  requestId
});

export const removeFriend = friendId => ({
  type: REMOVE_FRIEND,
  friendId
});


export const fetchFriendRequests = () => dispatch => (
  APIUtil.fetchFriendRequests().then(({ requests, users }) => {
    dispatch(receiveUsers(users));
    return dispatch(receiveFriendRequests(requests));
  })
);

export const fetchFriends = () => dispatch => (
  APIUtil.fetchFriends().then(friends => (
    dispatch(receiveFriends(friends))
  ))
);

export const createFriendRequest = (friendRequest) => dispatch => (
  APIUtil.createFriendRequest(friendRequest).then(request => (
    dispatch(receiveFriendRequest(request))
  ))
);

export const acceptFriendRequest = (friendRequest) => dispatch => (
  APIUtil.acceptFriendRequest(friendRequest).then(() => {
    dispatch(removeFriendRequest(friendRequest.id));
    return dispatch(receiveFriend(friendRequest.user_id));
  })
);

export const deleteFriendRequest = (friendRequest) => dispatch => (
  APIUtil.deleteFriendRequest(friendRequest).then(() => (
    dispatch(removeFriendRequest(friendRequest.id))
  ))
);

export const deleteFriend = (id) => dispatch => (
  APIUtil.deleteFriend(id).then(() => (
    dispatch(removeFriend(id))
  ))
);