import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { logout } from '../../../actions/session_actions';
import Channels from './channels';

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Channels);
