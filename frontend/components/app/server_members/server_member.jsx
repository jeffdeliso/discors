import React from 'react';
import { withRouter } from 'react-router-dom';
import UserPopup from '../modal/user_popup_container';

class ServerMember extends React.Component {

  transition() {
    const popUp = document.getElementsByClassName('popup-content');
    popUp[0].style.transform = 'translate(10px, 0)';
  }

  render() {
    return (
      <UserPopup component={
        <div className="server-member">
          <div className="server-member-img" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}>
            <div
              className="server-member-status-indicator"
              style={this.props.user.online ? { backgroundColor: '#43b581' } : { backgroundColor: '#747f8d' }}
            ></div>
          </div>
          <span>{this.props.user.username}</span>
        </div>
      }
        onOpen={this.transition}
        user={this.props.user}
        position={"left center"}
        offsetX={-5}
        offsetY={this.props.admin ? 10 : -90}
        showMessageButton={true}
      />
    )
  }
}

export default withRouter(ServerMember);