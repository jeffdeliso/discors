import * as APIUtil from '../util/server_api_utl';

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

export const receiveServer = (server, userId) => ({
  type: RECEIVE_SERVER,
  server,
  userId
});

export const removeServer = (serverId, userId) => ({
  type: REMOVE_SERVER,
  serverId,
  userId
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
    return dispatch(receiveUsers(users));
  })
);

export const createServer = (formData) => dispatch => (
  APIUtil.createServer(formData).then(server => (
    dispatch(receiveServer(server, server.admin_id))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const deleteServer = (serverId, userId) => dispatch => (
  APIUtil.deleteServer(serverId).then(() => (
    dispatch(removeServer(serverId, userId))
    )
  )
);

export const joinServer = (server, userId) => dispatch => (
  APIUtil.joinServer(server).then(server => (
    dispatch(receiveServer(server, userId))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);
