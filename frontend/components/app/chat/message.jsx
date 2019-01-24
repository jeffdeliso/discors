import React from "react";

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message">
        <div className="user-image" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
        <div className="username-message">
          <div className="username-time">
            <h4>{this.props.user.username}</h4>
            <h5>Today</h5>
          </div>
          <span>{this.props.message.body}</span>
        </div>
      </div>
    );
  }
}

export default Message;