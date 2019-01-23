import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Servers from './servers';
import { fetchServers, createServer, joinServer } from '../../../actions/server_actions';
import { removeServerErrors } from '../../../actions/server_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  
  return {
    servers: Object.values(state.entities.servers),
    errors: state.errors.server,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchServers: () => dispatch(fetchServers()),
    createServer: (server) => dispatch(createServer(server)),
    joinServer: (server) => dispatch(joinServer(server)),
    removeServerErrors: () => dispatch(removeServerErrors()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Servers));
