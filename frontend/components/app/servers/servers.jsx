import React from 'react';
import { Link } from 'react-router-dom';

class Servers extends React.Component {

  render() {
    return (
      <div className="side-bar">
        <Link to='/channels/@me' className="home-icon">
          <img src="/assets/main/white_logo.png" alt=""></img>
        </Link>
        <div className="separator"></div>
        <div className="side-scroll-container">
          <div className="friends-online"></div>

          <Link to='/channels/@me' href="" className="home-icon server serverSelected"><div className="server-active-icon"></div><img src="/assets/main/white_logo.png" alt=""></img></Link>
          <Link to='/channels/@me'href="" className="home-icon server"><img src="/assets/main/white_logo.png" alt=""></img></Link>

          <button className="create-server"><span>+</span></button>
        </div>
      </div>
    )
  }
}

export default Servers;