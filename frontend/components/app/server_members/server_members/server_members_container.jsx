import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ServerMembers from './server_members';
import { fetchMembers } from '../../../../actions/server_actions';
import { beginLoading, finishLoading } from '../../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  const server = state.entities.servers[ownProps.match.params.serverId] || {};
  return {
    server,
    members: Object.values(state.entities.users).filter(user => user.servers.includes(server.id)).sort((a, b) => {
      if (a.username < b.username) { return -1; }
      if (a.username > b.username) { return 1; }
      return 0;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: id => dispatch(fetchMembers(id)),
    beginLoading: () => dispatch(beginLoading()),
    finishLoading: () => dispatch(finishLoading()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServerMembers));

