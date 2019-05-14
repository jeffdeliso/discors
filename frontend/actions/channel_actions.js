import * as APIUtil from '../util/channel_api_util';
import { receiveUsers, removeServer } from './server_actions';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS';
export const REMOVE_CHANNEL_ERRORS = 'REMOVE_CHANNEL_ERRORS';


export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

export const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const receiveDmChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const removeChannel = channelId => ({
  type: REMOVE_CHANNEL,
  channelId
});

export const receiveErrors = errors => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors
});

export const removeChannelErrors = () => ({
  type: REMOVE_CHANNEL_ERRORS,
});


export const fetchChannels = (serverId, userId) => dispatch => (
  APIUtil.fetchChannels(serverId).then(channels => (
    dispatch(receiveChannels(channels))
  ), () => (
      dispatch(removeServer(serverId, userId))
  ))
);

export const deleteChannel = (id) => dispatch => (
  APIUtil.deleteChannel(id).then(() => (
    dispatch(removeChannel(id))
  ))
);

export const deleteDmChannel = (id) => dispatch => (
  APIUtil.deleteDmChannel(id).then((membership) => (
    dispatch(removeChannel(membership.channel_id))
  ))
);

export const fetchDmChannels = () => dispatch => (
  APIUtil.fetchDmChannels().then(({channels, users}) => {
    dispatch(receiveUsers(users));
    return dispatch(receiveChannels(channels));
  })
);

export const createChannel = (channel) => dispatch => (
  APIUtil.createChannel(channel).then(channel => (
    dispatch(receiveChannel(channel))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const createDmChannel = (userId) => dispatch => (
  APIUtil.createDmChannel(userId).then(channel => (
    dispatch(receiveChannel(channel))
  ))
);

