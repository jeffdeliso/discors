import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chat from './chat';


const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    channelId: ownProps.match.params.channelId,
    users: state.entities.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
