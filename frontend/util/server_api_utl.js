export const createServer = server => (
  $.ajax({
    method: 'POST',
    url: '/api/servers',
    data: { server }
  })
);

export const getServer = id => (
  $.ajax({
    method: 'POST',
    url: `/api/servers/${id}`,
  })
);

export const getServers = () => (
  $.ajax({
    method: 'GET',
    url: '/api/servers',
  })
);