import { RECEIVE_CHANNEL_ERRORS, RECEIVE_CHANNEL, REMOVE_CHANNEL_ERRORS } from '../../actions/channel_actions';
import { RECEIVE_VOICE_CHANNEL } from '../../actions/voice_channel_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL_ERRORS:
      return action.errors;
    case RECEIVE_CHANNEL:
      return [];
    case RECEIVE_VOICE_CHANNEL:
      return [];
    case REMOVE_CHANNEL_ERRORS:
      return [];
    default:
      return state;
  }
};
