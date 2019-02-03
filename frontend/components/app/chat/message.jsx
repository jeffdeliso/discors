import React from "react";
import UserPopup from "../modal/user_popup_container";
import { withRouter } from 'react-router-dom';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  parseDate() {
    const dateArr = this.props.message.created_at.split('T')[0].split('-');
    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
  }

  transition() {
    const popUp = document.getElementsByClassName('popup-content');
    popUp[0].style.transform = 'translate(-10px, 0)';
  }

  render() {
    return (
      <div className="message">
        <UserPopup component={
          <div className="user-image" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
        }
          user={this.props.user}
          position={'right center'}
          offsetX={2}
          offsetY={60}
          onOpen={this.transition}
        />
        <div className="username-message">
          <div className="username-time">
            <UserPopup component={
              <h4>{this.props.user.username}</h4>
            }
              user={this.props.user}
              position={'right center'}
              offsetX={2}
              offsetY={72}
              onOpen={this.transition}
            />
            <h5>{this.parseDate()}</h5>
          </div>
          <div className="message-p-wrapper">
            <p>{this.props.message.body}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Message);