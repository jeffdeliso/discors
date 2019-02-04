
import { combineReducers } from 'redux';
import users from './users_reducer';
import servers from './servers_reducer';
import channels from './channels_reducer';
import friendRequests from './friend_requests_reducer';
import friends from './friends_reducer';
import voiceChannels from './voice_channels_reducer';

export default combineReducers({
  users,
  servers,
  channels,
  friendRequests,
  friends,
  voiceChannels,
});
