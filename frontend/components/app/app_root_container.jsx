import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import AppRoot from './app_root';
import { logout } from '../../actions/session_actions';

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(AppRoot);
