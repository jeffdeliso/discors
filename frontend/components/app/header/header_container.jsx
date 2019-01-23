import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Header from './header';
import { withRouter } from 'react-router-dom';


const mapStateToProps = (state, ownProps) => {
  // const channelId = ownProps.match.params.channelId;
  // const serverId = ownProps.match.params.serverId;
  // if (server_id === '@me')

  // channel: state.channels[ownProps.match.params.channelId]

  return {
    // channel: state.channels[ownProps.match.params.channelId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
