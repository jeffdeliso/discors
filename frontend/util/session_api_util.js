export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

export const fetchCurrentUserData = () => (
  $.ajax({
    method: 'GET',
    url: '/api/users/data',
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

export const editUser = (formData) => (
  $.ajax({
    url: `/api/users/${formData.get('user[id]')}`,
    method: 'PATCH',
    data: formData,
    contentType: false,
    processData: false
  })
);