export const createChannel = channel => (
  $.ajax({
    method: 'POST',
    url: '/api/channels',
    data: { channel }
  })
);

export const createDmChannel = user_id => (
  $.ajax({
    method: 'POST',
    url: '/api/dm_channel_memberships',
    data: {dm_channel: { user_id }}
  })
);

export const fetchChannel = id => (
  $.ajax({
    method: 'GET',
    url: `/api/channels/${id}`,
  })
);

export const deleteChannel = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/channels/${id}`,
  })
);

export const deleteDmChannel = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/dm_channel_memberships/${id}`,
  })
);

export const fetchChannels = (server_id) => (
  $.ajax({
    method: 'GET',
    url: '/api/channels',
    data: { channel: {server_id} }
  })
);

export const fetchDmChannels = () => (
  $.ajax({
    method: 'GET',
    url: '/api/dm_channel_memberships',
  })
);

