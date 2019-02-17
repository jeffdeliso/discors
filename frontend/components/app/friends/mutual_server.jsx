import React from 'react';
import Tooltip from '../modal/tooltip';
import { Link } from 'react-router-dom';

class MutualServer extends React.Component {
  render() {
    return (
      <Tooltip component={
        <Link to={`/channels/${this.props.server.id}/${this.props.server.root_channel}`}
          onClick={e => e.stopPropagation()}
          className="mutual-server"
          style={this.props.server.icon_url ?
            { backgroundImage: `url(${this.props.server.icon_url})`, backgroundSize: '100%' } :
            { backgroundSize: '100%' }}
          onKeyDown={(e) => e.preventDefault()}
        ></Link>
      }
        position="top center"
        text={this.props.server.name}
      />
    )
  }
}

export default MutualServer;