import * as APIUtil from '../util/channel_api_util';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
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

export const receiveErrors = errors => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors
});

export const removeChannelErrors = () => ({
  type: REMOVE_CHANNEL_ERRORS,
});


export const fetchChannels = () => dispatch => (
  APIUtil.fetchChannels().then(channels => (
    dispatch(receiveChannels(channels))
  ))
);

export const createChannel = (channel) => dispatch => (
  APIUtil.createChannel(channel).then(channel => (
    dispatch(receiveChannel(channel))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);
