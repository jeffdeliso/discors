import { RECEIVE_VOICE_CHANNEL_ERRORS, RECEIVE_VOICE_CHANNEL, REMOVE_VOICE_CHANNEL_ERRORS } from '../actions/voice_channel_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VOICE_CHANNEL_ERRORS:
      return action.errors;
    case RECEIVE_VOICE_CHANNEL:
      return [];
    case REMOVE_VOICE_CHANNEL_ERRORS:
      return [];
    default:
      return state;
  }
};