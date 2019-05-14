import React from 'react';
import Tooltip from '../modal/tooltip';
import { Link } from 'react-router-dom';

function MutualServer(props) {
  return (
    <Tooltip component={
      <Link to={`/channels/${props.server.id}/${props.server.root_channel}`}
        onClick={e => e.stopPropagation()}
        className="mutual-server"
        style={props.server.icon_url ?
          { backgroundImage: `url(${props.server.icon_url})`, backgroundSize: '100%' } :
          { backgroundSize: '100%' }}
        onKeyDown={(e) => e.preventDefault()}
      ></Link>
    }
      position="top center"
      text={props.server.name}
    />
  )
}

export default MutualServer;