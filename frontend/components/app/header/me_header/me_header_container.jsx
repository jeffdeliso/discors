import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MeHeader from './me_header';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
    channel: state.entities.channels[ownProps.match.params.channelId] || {},
  };
};

export default withRouter(connect(mapStateToProps)(MeHeader));
