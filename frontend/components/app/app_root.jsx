import React from 'react';
import Servers from './servers/servers_container';
import ServerRoute from './app_routes/server_route';
import { Route, Switch } from 'react-router-dom';
import MeRoute from './app_routes/me_route';
import { connect } from 'react-redux';
import { fetchCurrentUserData } from '../../actions/session_actions';

class AppRoot extends React.Component {
  componentDidMount() {
    document.body.style = "overflow: hidden;";
    this.props.fetchCurrentUserData();
  }

  componentWillUnmount() {
    document.body.removeAttribute("style");
  }

  render() {
    return (
      <div className="main-body">
        <Servers />
        <Switch >
          <Route path="/channels/@me/:channelId" component={MeRoute} />
          <Route path="/channels/@me" component={MeRoute} />
          <Route path="/channels/:serverId/:channelId" component={ServerRoute} />
          <Route path="/channels/:serverId" component={ServerRoute} />
          <Route path="/" component={MeRoute} />
        </Switch >
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUserData: () => dispatch(fetchCurrentUserData()),
  };
};


export default connect(null, mapDispatchToProps)(AppRoot);


