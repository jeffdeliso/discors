import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../modal/tooltip';

class DmNotification extends React.Component {

  render() {
    return (
      <Tooltip component={
        <Link to={`/channels/@me/${this.props.notification.channelId}`}
          className="home-icon server"
          id="dm-notification"
          style={{ backgroundImage: `url(${this.props.user.image_url})`, backgroundSize: '100%'}}
          onKeyDown={(e) => e.preventDefault()}
        >
          <div className="dm-notification-badge">{this.props.notification.count}</div>
        </Link>
      }
        position="right center"
        text={this.props.user.username}
      />
    )
  };
};

export default DmNotification;