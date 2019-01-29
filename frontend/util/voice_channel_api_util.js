export const createVoiceChannel = audio_channel => (
  $.ajax({
    method: 'POST',
    url: '/api/audio_channels',
    data: { audio_channel }
  })
);

export const fetchVoiceChannel = id => (
  $.ajax({
    method: 'GET',
    url: `/api/audio_channels/${id}`,
  })
);

export const deleteVoiceChannel = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/audio_channels/${id}`,
  })
);

export const fetchVoiceChannels = (server_id) => (
  $.ajax({
    method: 'GET',
    url: '/api/audio_channels',
    data: { audio_channel: { server_id } }
  })
);
