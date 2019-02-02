import * as APIUtil from '../util/server_api_utl';
import { receiveFriendRequests } from './friends_actions';

export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const RECEIVE_SERVER_ERRORS = 'RECEIVE_SERVER_ERRORS';
export const REMOVE_SERVER_ERRORS = 'REMOVE_SERVER_ERRORS';
export const REMOVE_SERVER = 'REMOVE_SERVER';

export const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});

export const removeServer = serverId => ({
  type: REMOVE_SERVER,
  serverId
});

export const receiveErrors = errors => ({
  type: RECEIVE_SERVER_ERRORS,
  errors
});

export const removeServerErrors = () => ({
  type: REMOVE_SERVER_ERRORS,
});

export const fetchServers = () => dispatch => (
  APIUtil.fetchServers().then(servers => (
    dispatch(receiveServers(servers))
  ))
);

export const fetchMembers = (id) => dispatch => (
  APIUtil.fetchMembers(id).then(({users, requests}) => {
    dispatch(receiveFriendRequests(requests));
    return dispatch(receiveUsers(users));
  })
);

export const createServer = (formData) => dispatch => (
  APIUtil.createServer(formData).then(server => (
    dispatch(receiveServer(server))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const deleteServer = id => dispatch => (
  APIUtil.deleteServer(id).then(() => (
    dispatch(removeServer(id))
    )
  )
);

export const joinServer = (server) => dispatch => (
  APIUtil.joinServer(server).then(server => (
    dispatch(receiveServer(server))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);
