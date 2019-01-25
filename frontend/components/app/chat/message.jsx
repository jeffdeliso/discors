import React from "react";
import UserPopup from "../modal/user-popup";
import { withRouter } from 'react-router-dom';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  parseDate() {
    const dateArr = this.props.message.created_at.split('T')[0].split('-');
    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
  }

  handleClick() {
    this.props.createDmChannel(this.props.user.id).then((action) => this.props.history.push(`/channels/@me/${action.channel.id}`));
  }

  render() {
    return (
      <div className="message">
        <UserPopup component={
          <div className="user-image" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
        }
          user={this.props.user}
          currentUser={this.props.currentUser}
          position={'right center'}
          offsetX={12}
          offsetY={60}
          handleClick={this.handleClick}
        />
        <div className="username-message">
          <div className="username-time">
            <UserPopup component={
              <h4>{this.props.user.username}</h4>
            }
              user={this.props.user}
              currentUser={this.props.currentUser}
              position={'right center'}
              offsetX={12}
              offsetY={72}
              handleClick={this.handleClick}
            />
            <h5>{this.parseDate()}</h5>
          </div>
          <span>{this.props.message.body}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Message);