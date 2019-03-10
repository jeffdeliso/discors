import React from "react";
import { merge } from 'lodash';
import { withRouter } from 'react-router-dom';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      author_id: props.user.id,
    };

    this.messageInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  update(e) {
    this.setState({ body: e.currentTarget.value });
  }

  componentDidMount() {
    this.messageInput.current.focus();
  }

  componentDidUpdate(prevProps) {
    const channelId = this.props.match.params.channelId;

    if (prevProps.channel && prevProps.channel.id !== channelId) {
      this.messageInput.current.focus();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.subscription.speak({ message: merge({ channel_id: this.props.channelId }, this.state) });
    this.setState({ body: "" });
  }

  render() {
    let placeholder = '';

    if (this.props.channel.name && this.props.match.params.serverId) {
      placeholder = `Message #${this.props.channel.name}`;
    } else if (this.props.channel.name) {
      const nameArr = this.props.channel.name.split('-');
      let userId;

      if (nameArr[0] == this.props.user.id) {
        userId = nameArr[1];
      } else {
        userId = nameArr[0];
      }

      placeholder = `Message @${this.props.users[userId] ? this.props.users[userId].username : null}`;
    }

    return (
      <form onSubmit={this.handleSubmit} className="message-form">
        <div className="message-form-container">
          <input
            type="text"
            placeholder={placeholder}
            className="text-area"
            value={this.state.body}
            onChange={this.update}
            ref={this.messageInput}
          ></input>
        </div>
      </form>
    );
  }
}

export default withRouter(MessageForm);