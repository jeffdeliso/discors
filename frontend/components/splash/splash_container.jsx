import { connect } from 'react-redux';
import Splash from './splash';
import { login } from '../../actions/session_actions';

const mapStateToProps = ({ session }) => {
  return {
    currentUserId: session.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login({ username: 'hodor', password: 'hodorhodor' })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
