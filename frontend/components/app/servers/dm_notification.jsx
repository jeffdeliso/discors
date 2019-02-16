import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../modal/tooltip';

class DmNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = { classText: 'dm-notification'};
  }

  componentDidMount() {
    setTimeout(() => this.setState({classText: 'dm-notification right'}), 200);
  }
  
  render() {
    return (
      <Tooltip component={
        <Link to={`/channels/@me/${this.props.notification.channelId}`}
          className={`home-icon ${this.state.classText}`}
          id={`dm-notification-${this.props.notification.channelId}`}
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