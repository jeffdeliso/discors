import React from 'react';
import Servers from './servers/servers/servers_container';
import ServerRoute from './app_routes/server_route';
import { Route, Switch } from 'react-router-dom';
import MeRoute from './app_routes/me_route';
import { connect } from 'react-redux';
import { fetchCurrentUserData, receiveUser } from '../../actions/session_actions';
import LoadingScreen from './loading_screen';
import { receiveDmNotification } from '../../actions/notification_actions';
import { receiveChannel } from '../../actions/channel_actions';
import { receiveFriendRequest, removeFriendRequest, removeFriend, receiveFriend } from '../../actions/friends_actions';
import { beginLoading, finishLoading } from '../../actions/ui_actions';

class AppRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, class: '' };
  }

  componentWillMount() {
    this.setState({ loading: 'connecting' });
    this.props.beginLoading();
  }

  componentDidMount() {
    document.body.style.overflow = "hidden";

    this.notificationSubscription = App.cable.subscriptions.create(
      { channel: "NotificationsChannel", userId: this.props.currentUser.id },
      {
        received: data => {
          switch (data.type) {
            case "message":
              const channel = JSON.parse(data.channel);
              const author = JSON.parse(data.user);
              const notification = { channelId: channel.id, authorId: author.id };

              if (this.props.location.pathname !== `/channels/@me/${channel.id}`) {
                this.props.receiveChannel(channel);
                this.props.receiveUser(author);
                this.props.receiveDmNotification(notification);
              }

              break;
            case "friend_request":
              this.props.receiveUser(JSON.parse(data.user));
              this.props.receiveFriendRequest(JSON.parse(data.friend_request));

              break;
            case "friend_request_destroy":
              const request = JSON.parse(data.friend_request);
              this.props.removeFriendRequest(request.id);

              break;
            case "friend":
              const user = JSON.parse(data.user);
              this.props.receiveUser(user);
              this.props.receiveFriend(user.id);

              break;
            case "friend_destroy":
              this.props.removeFriend(JSON.parse(data.user_id));

              break;
          }
        },
      }
    );

    this.props.fetchCurrentUserData().then(() => {
      this.setState({ loading: 'ready' });
      this.props.finishLoading();
      setTimeout(() => {
        this.setState({ class: 'hidden' });
        setTimeout(() => {
          this.setState({ loading: false, class: '' });
        }, 200);
      }, 1000);
    });
  }

  componentWillUnmount() {
    this.notificationSubscription.unsubscribe();
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="main-body">
        {this.state.loading ? <LoadingScreen text={loading} classText={this.state.class} /> : null}
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
    receiveChannel: channel => dispatch(receiveChannel(channel)),
    receiveFriendRequest: request => dispatch(receiveFriendRequest(request)),
    removeFriendRequest: requestId => dispatch(removeFriendRequest(requestId)),
    removeFriend: friendId => dispatch(removeFriend(friendId)),
    receiveFriend: friendId => dispatch(receiveFriend(friendId)),
    beginLoading: () => dispatch(beginLoading()),
    finishLoading: () => dispatch(finishLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
