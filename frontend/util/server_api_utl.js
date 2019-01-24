export const createServer = server => (
  $.ajax({
    method: 'POST',
    url: '/api/servers',
    data: { server }
  })
);

export const fetchServer = id => (
  $.ajax({
    method: 'GET',
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
    method: 'POST',
    url: `/api/servers/join`,
    data: { server }
  })
);

export const deleteServer = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/servers/${id}`,
  })
);