import React from 'react';
import { Link } from 'react-router-dom';

class Friend extends React.Component {

  render() {
    return (
      <li className="friend-container">
        <div className="friend-name-contatiner">
          <div className="friend-icon" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
          <h4>{this.props.user.username}</h4>
        </div>
      </li>
    )
  }
}

export default Friend;