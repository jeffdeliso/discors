import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout, editUser, removeErrors } from '../../../../actions/session_actions';
import UserBar from './user_bar';

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    editUser: formData => dispatch(editUser(formData)),
    removeErrors: () => dispatch(removeErrors()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserBar));