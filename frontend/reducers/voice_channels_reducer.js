import merge from 'lodash/merge';
import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL } from '../actions/channel_actions';
import { RECEIVE_VOICE_CHANNEL, RECEIVE_VOICE_CHANNELS, REMOVE_VOICE_CHANNEL } from '../actions/voice_channel_actions';

const voiceChannelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VOICE_CHANNELS:
      return action.voiceChannels || {};
    case RECEIVE_VOICE_CHANNEL:
      return merge({}, state, { [action.voiceChannel.id]: action.voiceChannel });
    case REMOVE_VOICE_CHANNEL:
      const newState = merge({}, state);
      delete newState[action.voiceChannelId];
      return newState;
    default:
      return state;
  }
};

export default voiceChannelsReducer;


