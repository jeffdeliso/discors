export const RECEIVE_DM_NOTIFICATION = 'RECEIVE_DM_NOTIFICATION';
export const REMOVE_DM_NOTIFICATION = 'REMOVE_DM_NOTIFICATION';


export const receiveDmNotification = (notification) => ({
  type: RECEIVE_DM_NOTIFICATION,
  notification
});

export const removeDmNotification = (channelId) => ({
  type: REMOVE_DM_NOTIFICATION,
  channelId,
});