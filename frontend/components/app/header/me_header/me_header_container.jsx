import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MeHeader from './me_header';


const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MeHeader));
