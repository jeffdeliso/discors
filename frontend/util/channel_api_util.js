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
    url: '/api/channels/dm_create',
    data: { user_id }
  })
);

export const fetchChannel = id => (
  $.ajax({
    method: 'GET',
    url: `/api/channels/${id}`,
  })
);

export const fetchChannels = (server_id) => (
  $.ajax({
    method: 'GET',
    url: '/api/channels',
    data: { channel: {server_id} }
  })
);