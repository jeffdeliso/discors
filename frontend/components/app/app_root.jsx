import React from 'react';
import Servers from './servers/servers_container';
import ServerRoute from './app_routes/server_route';
import { Route, Switch } from 'react-router-dom';
import MeRoute from './app_routes/me_route';

class AppRoot extends React.Component {
  componentDidMount() {
    document.body.style = "overflow: hidden;";
  }

  componentWillUnmount() {
    document.body.removeAttribute("style");
  }

  render() {
    return (
      <div className="main-body">
        <Servers />
        <Switch >
          <Route path="/channels/@me" component={MeRoute} />
          <Route path="/channels/:serverId/:channelId" component={ServerRoute} />
          <Route path="/channels/:serverId" component={ServerRoute} />
          <Route path="/" component={MeRoute} />
        </Switch >
      </div>
    )
  }
}

export default AppRoot;
