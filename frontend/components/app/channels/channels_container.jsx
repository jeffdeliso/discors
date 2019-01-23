import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { logout } from '../../../actions/session_actions';
import Channels from './channels';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    // currentServer: state.entities.servers[ownProps.match.params.serverId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
