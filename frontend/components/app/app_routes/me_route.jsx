import React from 'react';
import DMChannels from '../channels/dm_channels/dm_channels_container';
import MeMain from './me_main';
import { Route, Switch } from 'react-router-dom';
import FriendsMain from './friends_main';

class MeRoute extends React.Component {
  render() {
    return (
      <>
        <DMChannels />
        <Switch >
          <Route path="/channels/@me/:channelId" component={MeMain} />
          <Route path="/" component={FriendsMain} />
        </Switch >
      </>
    )
  }
}

export default MeRoute;
