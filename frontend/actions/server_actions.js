import * as APIUtil from '../util/server_api_utl';

export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';

export const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

export const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});

export const fetchServers = () => dispatch => (
  APIUtil.fetchServers().then(servers => (
    dispatch(receiveServers(servers))
  ))
);

export const createServer = (server) => dispatch => (
  APIUtil.createServer(server).then(server => (
    dispatch(receiveServer(server))
  ))
);