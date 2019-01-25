
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
    this.subscribe(channelId);
  }

  componentDidUpdate(prevProps) {
    const channelId = this.props.match.params.channelId;

    if (channelId && prevProps.channelId !== this.props.match.params.channelId) {
      this.subscribe(channelId);
    }
    this.bottom.current.scrollIntoView();
  }

  subscribe(channelId) {
    const subscription = App.cable.subscriptions.subscriptions.find((subscription) => (
      subscription.identifier === `{"channel":"ChatChannel","channelId":"${channelId}"}`
    ));
    if (subscription) {
      subscription.load({ channelId });
    } else {
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
    }
  }

  componentWillUnmount() {
    App.cable.subscriptions.subscriptions.forEach(subscription => {
      App.cable.subscriptions.remove(subscription);
    });
  }

  render() {
    const messageList = this.state.messages.map((message, idx) => {
      return (
        <Message key={idx}
          message={message}
          user={this.props.users[message.author_id] || {}}
          currentUser={this.props.currentUser}
          channel={this.props.channel}
          createDmChannel={this.props.createDmChannel}
        />
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
        <MessageForm user={this.props.currentUser} channel={this.props.channel} channelId={this.props.channelId} users={this.props.users} />
      </div>
    )
  }
}

export default Chat;