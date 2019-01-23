import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Server extends React.Component {

  render() {
    return (
      <NavLink to={`/channels/${this.props.server.id}`}
        className="home-icon server"
        activeClassName="serverSelected"
      ><div className="server-active-icon"></div><img src="/assets/main/white_logo.png" alt=""></img></NavLink>
    )
  };
};

export default Server;