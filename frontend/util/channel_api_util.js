export const createChannel = channel => (
  $.ajax({
    method: 'POST',
    url: '/api/channels',
    data: { channel }
  })
);

export const fetchChannel = id => (
  $.ajax({
    method: 'GET',
    url: `/api/channels/${id}`,
  })
);

export const fetchChannels = () => (
  $.ajax({
    method: 'GET',
    url: '/api/channels',
  })
);