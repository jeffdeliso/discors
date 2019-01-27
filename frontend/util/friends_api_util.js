export const createFriendRequest = friend_request => (
  $.ajax({
    method: 'POST',
    url: '/api/friend_requests',
    data: { friend_request }
  })
);

export const acceptFriendRequest = friend_request => (
  $.ajax({
    method: 'PATCH',
    url: `/api/friend_requests/${friend_request.id}`,
  })
);

export const deleteFriendRequest = friend_request => (
  $.ajax({
    method: 'DELETE',
    url: `/api/friend_requests/${friend_request.id}`,
  })
);

export const fetchFriendRequests = () => (
  $.ajax({
    method: 'GET',
    url: '/api/friend_requests',
  })
);

export const deleteFriend = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/friends/${id}`,
  })
);

export const fetchFriends = () => (
  $.ajax({
    method: 'GET',
    url: '/api/friends',
  })
);