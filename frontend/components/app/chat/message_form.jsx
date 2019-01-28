import React from "react";
import {merge} from 'lodash';
import { withRouter } from 'react-router-dom';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "", author_id: props.user.id };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update() {
    return e =>
      this.setState({ body: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.setState({channel_id: this.props.channelId});
    // App.cable.subscriptions.subscriptions.find((subscription) => (
    //   subscription.identifier === `{"channel":"ChatChannel","channelId":"${this.props.channelId}"}`
    // ))
    this.props.subscription.speak({message: merge({channel_id: this.props.channelId}, this.state)});
    this.setState({ body: "" });
  }

  render() {
    let placeholder = '';
    if (this.props.channel && this.props.match.params.serverId) {
      placeholder = `Message #${this.props.channel.name}`;
    } else if (this.props.channel) {
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
        <input 
          type="text"
          placeholder={placeholder}
          className="text-area"
          value={this.state.body}
          onChange={this.update()}
        ></input>
      </form>
    );
  }
}

export default withRouter(MessageForm);