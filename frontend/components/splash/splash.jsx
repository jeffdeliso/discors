import React from 'react';
import { Link } from 'react-router-dom';
// import computer from ''
class Splash extends React.Component {

  render() {

    return (

    <img src={"<%= asset_path(computer.svg) %>"} alt="" className="pic dot1"></img>
    )
  }
}

export default Splash;