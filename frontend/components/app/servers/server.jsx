import React from 'react';
import { NavLink } from 'react-router-dom';
import Tooltip from '../modal/tooltip';

class Server extends React.Component {
  onKeyPress(e) {
    if (e.which === 13) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <Tooltip component={
        <NavLink to={`/channels/${this.props.server.id}`}
          className="home-icon server"
          activeClassName="serverSelected"
          activeStyle={{ pointerEvents: 'none', cursor: 'pointer' }}
          style={ this.props.server.icon_url ?
             { backgroundImage: `url(${this.props.server.icon_url})`, backgroundSize: '100%' } :
             { backgroundSize: '180%' }}
          onKeyDown={(e) => e.preventDefault()}
        ><div className="server-active-icon"></div></NavLink>
      }
        position="right center"
        text={this.props.server.name}
      />
    )
  };
};

export default Server;