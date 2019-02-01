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

    // this.handleFile = this.handleFile.bind(this);
  }

  update() {
    return e => this.setState({ body: e.currentTarget.value });
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
  // handleSubmit(e) {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('message[body]', this.state.username);
  //   if (this.state.imageFile) {

  //     formData.append('user[image]', this.state.imageFile);
  //   }

  //   this.props.subscription.speak({ message: merge({ channel_id: this.props.channelId }, this.state) });
  //   this.setState({ body: "" });
  // }

  handleSubmit(e) {
    e.preventDefault();
    this.props.subscription.speak({ message: merge({ channel_id: this.props.channelId }, this.state) });
    this.setState({ body: "" });
  }

  // handleFile(e) {
  //   const file = e.currentTarget.files[0];
  //   const formData = new FormData();
  //   formData.append('message[image]', file);
  //   this.props.subscription.speak({ message: { channel_id: this.props.channelId, body: this.state.body, author_id: this.state.author_id }, formData });
  //   this.setState({ body: "" });
  // }

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
      placeholder = `Message @${this.props.users[userId].username}`;
    }
    return (
      <form onSubmit={this.handleSubmit} className="message-form">
        <div className="message-form-container">
          <div className="message-attachment-container">
            <div className="message-attachment-button">
              <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
            </div>
            {/* <input type="file" onChange={this.handleFile} onKeyDown={(e) => e.preventDefault()} multipleaccept=".jpg,.jpeg,.png,.gif" /> */}
          </div>
          <div className="message-form-separator"></div>
          <input
            type="text"
            placeholder={placeholder}
            className="text-area"
            value={this.state.body}
            onChange={this.update()}
            ref={this.messageInput}
          ></input>
        </div>
      </form>
    );
  }
}

export default withRouter(MessageForm);