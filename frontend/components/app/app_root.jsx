import React from 'react';
import Servers from './servers/servers_container';
import ServerRoute from './app_routes/server_route';
import { Route, Switch } from 'react-router-dom';
import MeRoute from './app_routes/me_route';
import { connect } from 'react-redux';
import { fetchCurrentUserData, receiveUser } from '../../actions/session_actions';
import LoadingScreen from './loading_screen';
import { receiveDmNotification } from '../../actions/notification_actions';

class AppRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, class: '' };
  }
  componentWillMount() {
    this.setState({ loading: 'connecting' });
  }

  componentDidMount() {
    document.body.style = "overflow: hidden;";

    this.notificationSubscription = App.cable.subscriptions.create(
      { channel: "NotificationsChannel", userId: this.props.currentUser.id },
      {
        received: data => {
          switch (data.type) {
            case "message":
              const message = JSON.parse(data.message);
              const notification = { channelId: message.channel_id, authorId: message.author_id };
              this.props.receiveUser(JSON.parse(data.user));
              this.props.receiveDmNotification(notification);
              break;
            case "messages":
              this.setState({ messages: data.messages });
              break;
          }
        },
      }
    );

    this.props.fetchCurrentUserData().then(() => {
      this.setState({ loading: 'ready' });
      setTimeout(() => {
        this.setState({ class: 'hidden' });
        setTimeout(() => {
          this.setState({ loading: false, class: '' });
        }, 200);
      }, 1000);
    });
  }

  componentWillUnmount() {
    document.body.removeAttribute("style");
  }

  render() {
    return (
      <div className="main-body">
        {this.state.loading ? <LoadingScreen text={this.state.loading} classText={this.state.class} /> : null}
        <Servers />
        <Switch >
          <Route path="/channels/@me/:channelId" component={MeRoute} />
          <Route path="/channels/@me" component={MeRoute} />
          <Route path="/channels/:serverId/:channelId" component={ServerRoute} />
          <Route path="/channels/:serverId" component={ServerRoute} />
          <Route path="/" component={MeRoute} />
        </Switch >
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.id],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUserData: () => dispatch(fetchCurrentUserData()),
    receiveDmNotification: notification => dispatch(receiveDmNotification(notification)),
    receiveUser: user => dispatch(receiveUser(user)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);

receiveUser