
import React from 'react';
import { Link } from 'react-router-dom';
import MessageForm from './message_form';
import Message from './message';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.bottom = React.createRef();
  }

  componentDidMount() {
    const channelId = this.props.match.params.channelId;

    App.cable.subscriptions.create(
      { channel: "ChatChannel", channelId },
      {
        received: data => {
          switch (data.type) {
            case "message":
              this.setState({
                messages: this.state.messages.concat(data.message)
              });
              break;
            case "messages":
              this.setState({ messages: data.messages });
              break;
          }
        },
        speak: function (data) { return this.perform("speak", data); },
        load: function (data) { return this.perform("load", data); }
      }
    );
    // App.cable.subscriptions.subscriptions[0].load({ channelId });
  }

  componentDidUpdate(prevProps) {
    const channelId = this.props.match.params.channelId;

    if (channelId && prevProps.channelId !== this.props.match.params.channelId) {
      App.cable.subscriptions.create(
        { channel: "ChatChannel", channelId },
        {
          received: data => {
            switch (data.type) {
              case "message":
                this.setState({
                  messages: this.state.messages.concat(data.message)
                });
                break;
              case "messages":
                this.setState({ messages: data.messages });
                break;
            }
          },
          speak: function (data) { return this.perform("speak", data); },
          load: function (data) { return this.perform("load", data); }
        }
      );
      App.cable.subscriptions.subscriptions[0].load({ channelId });
    }
    this.bottom.current.scrollIntoView();
  }


  render() {
    const messageList = this.state.messages.map((message, idx) => {
      return (
        <Message key={idx} message={message} user={this.props.users[message.author_id] || {}} bottom={this.bottom} />
      );
    });

    return (
      <div className="chat-main">
        <div className="message-wrapper">
          <div className="message-scroll-wrapper">
            <div className="message-list">
              {messageList}
              <div ref={this.bottom} />
            </div>
          </div>
        </div>
        <MessageForm user={this.props.currentUser} channelId={this.props.channelId} />
      </div>
    )
  }
}

export default Chat;