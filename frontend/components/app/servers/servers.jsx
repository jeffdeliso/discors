import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Server from './server';
import Modal from 'react-modal';

class Servers extends React.Component {
  componentDidMount() {
    this.props.fetchServers();
  }

  render() {
    const servers = this.props.servers.map((server, idx) => {
      return <Server key={idx} server={server} />
    });
    return (
      <div className="side-bar">
        <NavLink to='/channels/@me' className="home-icon" activeClassName="serverSelected">
          <div className="server-active-icon"></div><img src="/assets/main/white_logo.png" alt=""></img>
        </NavLink>
        <div className="separator"></div>
        <div className="side-scroll-container">
          <div className="friends-online"></div>
          {servers}
          <button className="create-server"><span>+</span></button>
          <Modal>dddddfddf</Modal>
        </div>
      </div>
    )
  }
}

export default Servers;