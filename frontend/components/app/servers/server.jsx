import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup'

class Server extends React.Component {

  render() {
    return (
      <Popup trigger={
        <NavLink to={`/channels/${this.props.server.id}`}
          className="home-icon server"
          activeClassName="serverSelected"
          activeStyle={{ pointerEvents: 'none', cursor: 'pointer' }}
        ><div className="server-active-icon"></div></NavLink>
      }
        position="right center"
        on="hover"
        overlayStyle={{
          width: `auto`,
          backgroundColor: 'black',
        }}
        arrowStyle={{
          backgroundColor: 'black',
          zIndex: 4,
        }}
        contentStyle={{
          zIndex: 4,
          width: `auto`,
          whiteSpace: 'nowrap',
          fontFamily: 'main3',
          borderRadius: 5,
          color: '#fff',
          backgroundColor: 'black',
          border: 'none',
          fontSize: '14px',
          display: 'flex',
          padding: '10px',

        }}
      >
        <div>{this.props.server.name}</div>
      </Popup>
    )
  };
};

export default Server;