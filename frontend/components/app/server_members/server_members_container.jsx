import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ServerMembers from './server_members';
import { fetchMembers } from '../../../actions/server_actions';


const mapStateToProps = (state, ownProps) => {
  const server = state.entities.servers[ownProps.match.params.serverId] || {};
  return {
    server,
    members: Object.values(state.entities.users).filter(user => user.servers.includes(server.id)),
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: id => dispatch(fetchMembers(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServerMembers));
