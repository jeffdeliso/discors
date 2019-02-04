import * as APIUtil from '../util/voice_channel_api_util';
import { receiveErrors } from './channel_actions';

export const RECEIVE_VOICE_CHANNELS = 'RECEIVE_VOICE_CHANNELS';
export const RECEIVE_VOICE_CHANNEL = 'RECEIVE_VOICE_CHANNEL';
export const REMOVE_VOICE_CHANNEL = 'REMOVE_VOICE_CHANNEL';
export const RECEIVE_VOICE_CHANNEL_ERRORS = 'RECEIVE_VOICE_CHANNEL_ERRORS';
export const REMOVE_VOICE_CHANNEL_ERRORS = 'REMOVE_VOICE_CHANNEL_ERRORS';


export const receiveVoiceChannels = voiceChannels => ({
  type: RECEIVE_VOICE_CHANNELS,
  voiceChannels
});

export const receiveVoiceChannel = voiceChannel => ({
  type: RECEIVE_VOICE_CHANNEL,
  voiceChannel
});

export const removeVoiceChannel = voiceChannelId => ({
  type: REMOVE_VOICE_CHANNEL,
  voiceChannelId
});


export const fetchVoiceChannels = (serverId) => dispatch => (
  APIUtil.fetchVoiceChannels(serverId).then(voiceChannels => (
    dispatch(receiveVoiceChannels(voiceChannels))
  ))
);

export const deleteVoiceChannel = (id) => dispatch => (
  APIUtil.deleteVoiceChannel(id).then(() => (
    dispatch(removeVoiceChannel(id))
  ))
);

export const createVoiceChannel = (voiceChannel) => dispatch => (
  APIUtil.createVoiceChannel(voiceChannel).then(voiceChannel => (
    dispatch(receiveVoiceChannel(voiceChannel))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);