import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { logout } from '../../../actions/session_actions';
import Main from './main';

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Main);

