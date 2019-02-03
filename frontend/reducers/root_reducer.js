import { combineReducers } from 'redux';

import entities from './entities_reducer';
import ui from './ui_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import notifications from './notifications/notifications_reducer';

const rootReducer = combineReducers({
  entities,
  session,
  errors,
  ui,
  notifications,
});

export default rootReducer;