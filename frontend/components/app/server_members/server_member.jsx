import React from 'react';
import { withRouter } from 'react-router-dom';
import UserPopup from '../modal/user_popup_container';

function ServerMember(props) {

  const transition = () => {
    const popUp = document.getElementsByClassName('popup-content');
    popUp[0].style.transform = 'translate(10px, 0)';
  }

  return (
    <UserPopup component={
      <div className="server-member">
        <div className="server-member-img" style={props.user.image_url ? { backgroundImage: `url(${props.user.image_url})` } : {}}>
          <div
            className="server-member-status-indicator"
            style={props.user.online ? { backgroundColor: '#43b581' } : { backgroundColor: '#747f8d' }}
          ></div>
        </div>
        <span>{props.user.username}</span>
      </div>
    }
      onOpen={transition}
      user={props.user}
      position={"left center"}
      offsetX={-5}
      offsetY={props.admin ? 10 : -90}
      showMessageButton={true}
    />
  )
}

export default withRouter(ServerMember);