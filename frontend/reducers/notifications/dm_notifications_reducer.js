import merge from 'lodash/merge';
import { RECEIVE_DM_NOTIFICATION, REMOVE_DM_NOTIFICATION } from '../../actions/notification_actions';

const dmNotificationsReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_DM_NOTIFICATION:
      if (state[action.notification.channelId]) {
        newState = merge({}, state);
        newState[action.notification.channelId].count++;
        return newState;
      } else {
        return merge({}, state, { [action.notification.channelId]: merge(action.notification, { count: 1 }) });
      }
    case REMOVE_DM_NOTIFICATION:
      newState = merge({}, state);
      delete newState[action.channelId];
      return newState;
    default:
      return state;
  }
};

export default dmNotificationsReducer;
