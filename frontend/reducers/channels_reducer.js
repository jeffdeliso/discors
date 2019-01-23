import merge from 'lodash/merge';
import { RECEIVE_CHANNELS, RECEIVE_CHANNEL } from '../actions/channel_actions';

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      return merge({}, state, { [action.channel.id]: action.channel });
    default:
      return state;
  }
};

export default channelsReducer;