import React from 'react';
import MessageForm from '../message_form';
import Message from '../message';
import { union } from 'lodash';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };

    this.bottom = React.createRef();
    this.parseNewMessage = this.parseNewMessage.bind(this);
  }

  componentDidMount() {
    const channelId = this.props.match.params.channelId;
    if (!this.props.loading) {
      this.subscribe(channelId);
    }

    if (channelId && !this.props.channel.serverId) {
      const notification = document.getElementById(`dm-notification-${channelId}`);

      if (notification) {
        notification.className = 'dm-notification';
        setTimeout(() => this.props.removeDmNotification(channelId), 200);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const channelId = this.props.match.params.channelId;

    if (prevProps.loading && !this.props.loading && !this.messagesLoaded) {
      this.subscribe(channelId);
    }

    if (channelId && prevProps.channelId !== channelId) {
      this.messageStr = null;
      this.time = null;
      this.lastAuthorId = null;
      this.messageId = null;
      this.setState({ messages: [] });
      this.messagesLoaded = false;

      if (this.subscription) this.subscription.unsubscribe();

      if (!this.props.loading && !this.messagesLoaded) this.subscribe(channelId);

      if (channelId && !this.props.channel.serverId) {
        const notification = document.getElementById(`dm-notification-${channelId}`);
        if (notification) {
          notification.className = 'dm-notification';
          setTimeout(() => this.props.removeDmNotification(channelId), 200);
        }
      }
    }

    if (this.messagesLoaded && !this.scrolled) {
      this.bottom.current.scrollIntoView();
      this.scrolled = true;
    }
  }

  subscribe(channelId) {
    this.subscription = App.cable.subscriptions.subscriptions.find((subscription) => (
      subscription.identifier === `{"channel":"ChatChannel","channelId":"${channelId}"}`
    ));

    if (this.subscription) {
      this.subscription.load({ channelId });
    } else {
      const that = this;
      this.subscription = App.cable.subscriptions.create(
        { channel: "ChatChannel", channelId },
        {
          received: data => {
            switch (data.type) {
              case "message":
                this.scrolled = false;
                this.parseNewMessage(data.message);
                break;
              case "messages":
                this.scrolled = false;
                this.messagesLoaded = true;
                this.setState({ messages: this.parseMessages(data.messages) });
                break;
              case "error":
                const server = that.props.server;
                that.props.removeChannel(channelId);
                that.props.history.push(`/channels/${server.id}/${server.root_channel}`);
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
    if (this.subscription) this.subscription.unsubscribe();
  }

  parseMessages(messages) {
    const messageArr = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      if (i === 0) {
        if (messages.length === 1) {
          messageArr.push(
            <Message key={message.id}
              message={message.body}
              user={this.props.users[message.author_id] || {}}
              time={message.created_at}
              showMessageButton={this.props.channel.server_id ? true : false}
              bottom={this.bottom.current}
            />);
        }

        this.messageStr = message.body;
        this.time = message.created_at;
        this.lastAuthorId = message.author_id;
        this.messageId = message.id;
      } else if (i === messages.length - 1) {
        if (message.author_id === this.lastAuthorId) {
          this.messageStr = this.messageStr + '\n' + message.body;
          messageArr.push(
            <Message key={this.messageId}
              message={this.messageStr}
              user={this.props.users[this.lastAuthorId] || {}}
              time={this.time}
              showMessageButton={this.props.channel.server_id ? true : false}
              bottom={this.bottom.current}
            />
          )
        } else {
          messageArr.push(
            <Message key={this.messageId}
              message={this.messageStr}
              user={this.props.users[this.lastAuthorId] || {}}
              time={this.time}
              showMessageButton={this.props.channel.server_id ? true : false}
              bottom={this.bottom.current}
            />);

          messageArr.push(
            <Message key={message.id}
              message={message.body}
              user={this.props.users[message.author_id] || {}}
              time={message.created_at}
              showMessageButton={this.props.channel.server_id ? true : false}
              bottom={this.bottom.current}
            />);

          this.messageStr = message.body;
          this.time = message.created_at;
          this.lastAuthorId = message.author_id;
          this.messageId = message.id;
        }
      } else if (message.author_id === this.lastAuthorId) {
        this.messageStr = this.messageStr + '\n' + message.body;
      } else {
        messageArr.push(
          <Message key={this.messageId}
            message={this.messageStr}
            user={this.props.users[this.lastAuthorId] || {}}
            time={this.time}
            showMessageButton={this.props.channel.server_id ? true : false}
            bottom={this.bottom.current}
          />);

        this.messageStr = message.body;
        this.time = message.created_at;
        this.messageId = message.id;
        this.lastAuthorId = message.author_id;
      }
    }

    return messageArr
  }

  parseNewMessage(message) {
    if (message.author_id === this.lastAuthorId) {
      this.messageStr = this.messageStr + '\n' + message.body;
      const newMessages = union([], this.state.messages);

      newMessages[newMessages.length - 1] = (
        <Message key={this.messageId}
          message={this.messageStr}
          user={this.props.users[this.lastAuthorId] || {}}
          time={this.time}
          showMessageButton={this.props.channel.server_id ? true : false}
          bottom={this.bottom.current}
        />);

      this.setState({
        messages: newMessages
      });
    } else {
      this.messageStr = message.body;
      this.time = message.created_at;
      this.lastAuthorId = message.author_id;
      this.messageId = message.id;

      this.setState({
        messages: this.state.messages.concat(
          <Message key={message.id}
            message={message.body}
            user={this.props.users[message.author_id] || {}}
            time={message.created_at}
            showMessageButton={this.props.channel.server_id ? true : false}
          />)
      });
    }
  }

  render() {
    let emptyMessage = null;

    if (this.props.channel.name === "general") {
      emptyMessage = (
        <div className="welcome-message">
          <h2>{`welcome to the server, ${this.props.currentUser.username}!`}</h2>
          <div>
            <div className="server-welcome-item">
              <div className="exclamation-icon"></div>
              <p><strong>Discors</strong> is a clone of the awesome Discord app! This site is purely for educational purposes.</p>
            </div>
            <div className="server-welcome-item">
              <div className="comp-icon"></div>
              <p><strong>Learn about Discors</strong> by exploring the site or visiting the github repo <a href="https://github.com/jeffdeliso/discors" target="_blank">here!</a></p>
            </div>
            <div className="server-welcome-item">
              <div className="personal-icon"></div>
              <p><strong>Learn about the developer</strong> and my other projects by visiting my website <a href="https://www.jeffdeliso.com" target="_blank">here!</a></p>
            </div>
            <div className="server-welcome-item">
              <div className="phone-icon"></div>
              <p><strong>Reach me</strong> via <a href="https://www.linkedin.com/in/jdeliso/" target="_blank">LinkedIn</a> or send me an email at <a href="mailto: jad346@cornell.edu">jad346@cornell.edu</a>!</p>
            </div>
          </div>
          <div className="empty-chat empty-welcome">
          </div>
        </div>
      )
    } else {
      if (this.props.channel.name && this.props.match.params.serverId) {
        emptyMessage = <div className="empty-chat"><h4>Welcome to the beginning of the <strong>{`#${this.props.channel.name}`}</strong> channel.</h4></div>;
      } else if (this.props.channel.name) {
        const nameArr = this.props.channel.name.split('-');
        let userId;

        if (nameArr[0] == this.props.currentUser.id) {
          userId = nameArr[1];
        } else {
          userId = nameArr[0];
        }

        emptyMessage = emptyMessage = <div className="empty-chat"><h4>This is the beginning of your direct message history with <strong>{this.props.users[userId] ? `@${this.props.users[userId].username}` : ''}</strong></h4></div>;
      }
    }

    return (
      <div className="chat-main">
        <div className="message-wrapper">
          <div className="message-scroll-wrapper">
            <div className="message-list">
              {emptyMessage}
              {this.state.messages}
              <div ref={this.bottom} />
            </div>
          </div>
        </div>
        <MessageForm
          user={this.props.currentUser}
          channel={this.props.channel}
          channelId={this.props.channelId}
          users={this.props.users}
          subscription={this.subscription}
        />
      </div >
    )
  }
}

export default Chat;