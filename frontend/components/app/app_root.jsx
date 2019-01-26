import React from 'react';
import Servers from './servers/servers_container';
import Channels from './channels/channels_container';
import Header from './header/header';
import Chat from './chat/chat';
import ServerMembers from './server_members/server_members';
import ServerRoute from './app_routes/server_route';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import MeRoute from './app_routes/me_route';
import FriendsRoute from './app_routes/friends_route';

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
        <Switch >
          <Route path="/channels/@me/:channelId" component={MeRoute} />
          <Route path="/channels/@me" component={FriendsRoute} />
          <Route path="/channels/:serverId/:channelId" component={ServerRoute} />
          <Route path="/channels/:serverId" component={ServerRoute} />
          <Route path="/" component={FriendsRoute} />
        </Switch >
      </div>
    )
  }
}

export default AppRoot;
