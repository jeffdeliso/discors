import { BEGIN_LOADING, FINISH_LOADING } from "../actions/ui_actions";

export default (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case BEGIN_LOADING:
      return true;
    case FINISH_LOADING:
      return false;
    default:
      return state;
  }
};
