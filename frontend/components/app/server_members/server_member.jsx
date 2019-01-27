import React from 'react';
import Popup from 'reactjs-popup';
import { withRouter } from 'react-router-dom';
import UserPopup from '../modal/user_popup_container';

class ServerMember extends React.Component {
  render() {
    return (
      <UserPopup component={
        <div className="server-member">
          <div className="server-member-img" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
          <span>{this.props.user.username}</span>
        </div>
      }
        user={this.props.user}
        position={"left center"}
        offsetX={-15}
        offsetY={-90}
      />
    )
  }
}

export default withRouter(ServerMember);