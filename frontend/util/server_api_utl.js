export const createServer = server => (
  $.ajax({
    method: 'POST',
    url: '/api/servers',
    data: { server }
  })
);

export const fetchServer = id => (
  $.ajax({
    method: 'POST',
    url: `/api/servers/${id}`,
  })
);

export const fetchServers = () => (
  $.ajax({
    method: 'GET',
    url: '/api/servers',
  })
);

export const joinServer = server => (
  $.ajax({
    method: 'GET',
    url: `/api/servers/${server.name}`,
    data: { server }
  })
);