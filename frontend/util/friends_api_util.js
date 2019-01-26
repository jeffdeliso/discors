export const createFriendRequest = friend_request => (
  $.ajax({
    method: 'POST',
    url: '/api/friend_requests',
    data: { friend_request }
  })
);

// export const createDmChannel = user_id => (
//   $.ajax({
//     method: 'POST',
//     url: '/api/channels/dm_create',
//     data: { user_id }
//   })
// );

// export const fetchChannel = id => (
//   $.ajax({
//     method: 'GET',
//     url: `/api/channels/${id}`,
//   })
// );

// export const fetchChannels = (server_id) => (
//   $.ajax({
//     method: 'GET',
//     url: '/api/channels',
//     data: { channel: { server_id } }
//   })
// );

// export const fetchDmChannels = () => (
//   $.ajax({
//     method: 'GET',
//     url: '/api/channels/dm_index',
//   })
// );