import React from "react";
import {merge} from 'lodash';

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
    this.setState({channel_id: this.props.channelId});
    App.cable.subscriptions.subscriptions.find((subscription) => (
      subscription.identifier === `{"channel":"ChatChannel","channelId":"${this.props.channelId}"}`
    )).speak({message: merge({channel_id: this.props.channelId}, this.state)});
    this.setState({ body: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="message-form">
        <input 
          type="text"
          placeholder={`Message #${this.props.channel ? this.props.channel.name : ''}`}
          className="text-area"
          value={this.state.body}
          onChange={this.update()}
        ></input>
      </form>
    );
  }
}

export default MessageForm;