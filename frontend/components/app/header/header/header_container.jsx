import { connect } from 'react-redux';
import Header from './header';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.entities.channels[ownProps.match.params.channelId] || {},
  };
};

export default withRouter(connect(mapStateToProps)(Header));
