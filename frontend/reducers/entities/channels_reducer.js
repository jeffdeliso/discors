import merge from 'lodash/merge';
import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL } from '../../actions/channel_actions';
import { RECEIVE_CURRENT_USER_DATA } from '../../actions/session_actions';

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER_DATA:
      return action.currentUserData.channels || {};
    case RECEIVE_CHANNELS:
      return merge({}, state, action.channels);
    case RECEIVE_CHANNEL:
      return merge({}, state, { [action.channel.id]: action.channel });
    case REMOVE_CHANNEL:
      const newState = merge({}, state);
      delete newState[action.channelId];
      return newState;
    default:
      return state;
  }
};

export default channelsReducer;
