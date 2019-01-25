import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ServerMembers from './server_members';
import { fetchMembers } from '../../../actions/server_actions';
import { createDmChannel } from '../../../actions/channel_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    server: state.entities.servers[ownProps.match.params.serverId] || {},
    members: Object.values(state.entities.users),
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: id => dispatch(fetchMembers(id)),
    createDmChannel: userId => dispatch(createDmChannel(userId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServerMembers));
