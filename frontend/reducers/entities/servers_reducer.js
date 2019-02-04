import merge from 'lodash/merge';
import { RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from '../../actions/server_actions';
import { RECEIVE_CURRENT_USER_DATA } from '../../actions/session_actions';

const serversReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER_DATA:
      return action.currentUserData.servers || {};
    case RECEIVE_SERVERS:
      return merge({}, state, action.servers);
    case RECEIVE_SERVER:
      return merge({}, state, { [action.server.id]: action.server });
    case REMOVE_SERVER:
      const newState = merge({}, state);
      delete newState[action.serverId];
      return newState;
    default:
      return state;
  }
};

export default serversReducer;
