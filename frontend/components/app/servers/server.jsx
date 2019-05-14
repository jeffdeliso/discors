import React from 'react';
import { NavLink } from 'react-router-dom';
import Tooltip from '../modal/tooltip';

function Server(props) {
  return (
    <Tooltip component={
      <NavLink to={`/channels/${props.server.id}/${props.server.root_channel}`}
        className="home-icon server"
        activeClassName="serverSelected"
        style={props.server.icon_url ?
          { backgroundImage: `url(${props.server.icon_url})`, backgroundSize: '100%' } :
          { backgroundSize: '180%' }}
        onKeyDown={(e) => e.preventDefault()}
      ><div className="server-active-icon"></div></NavLink>
    }
      position="right center"
      text={props.server.name}
    />
  )
};

export default Server;