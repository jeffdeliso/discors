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
    login: () => dispatch(login({ username: 'guest', password: 'starwars' })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
