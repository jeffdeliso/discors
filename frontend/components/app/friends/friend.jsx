import React from 'react';
import { withRouter } from 'react-router-dom';
import { intersection } from 'lodash';
import Tooltip from '../modal/tooltip';
import MutualServer from './mutual_server';

function Friend(props) {

  const handleClickParent = () => {
    props.createDmChannel(props.user.id).then((action) => props.history.push(`/channels/@me/${action.channel.id}`));
  }

  const handleReject = (e) => {
    e.stopPropagation();
    props.reject();
  }

  const handleAccept = (e) => {
    e.stopPropagation();
    props.accept();
  }

  const mutualServerIds = intersection(props.currentUser.servers, props.user.servers);

  let mutualServers;
  if (mutualServerIds.length <= 6) {
    mutualServers = mutualServerIds.map((serverId, idx) => {
      const server = props.servers[serverId] || {};
      return <MutualServer server={server} key={idx} />;
    });
  } else {
    mutualServers = [];

    for (let i = 0; i < 5; i++) {
      const serverId = mutualServerIds[i];
      const server = props.servers[serverId] || {};
      mutualServers.push(<MutualServer server={server} key={i} />);
    }

    mutualServers.push(<div className="extra-servers" key={mutualServerIds.length}>{`+${mutualServerIds.length - 5}`}</div>);
  }

  return (
    <li className="friend-container"
      onClick={handleClickParent}
      style={props.first ? { borderColor: 'transparent' } : {}}
    >
      <div className="friend-name-container">
        <div className="friend-icon" style={props.user.image_url ? { backgroundImage: `url(${props.user.image_url})` } : {}}></div>
        <h4>{props.user.username}</h4>
      </div>
      <div className="friend-status-container">
        <div
          className="friends-status-indicator"
          style={props.user.online ? { backgroundColor: '#43b581' } : { backgroundColor: '#747f8d' }}
        ></div>
        <h4>{props.status}</h4>
      </div>
      <div className="mutual-servers-container">
        {mutualServers}
      </div>
      <div className="friend-accept-reject">
        {props.status === 'Incoming friend request' ?
          <Tooltip component={
            <button className="accept-friend" onClick={handleAccept}></button>
          }
            position="top center"
            text='Accept'
          />
          : null}
        <Tooltip component={
          <button
            className={props.status.includes('request') ? "reject-friend" : "remove-friend"}
            onClick={handleReject}
          ></button>
        }
          position="top center"
          text={props.status.includes('request') ? (props.status.includes('Outgoing') ? "Cancel" : "Ignore") : "Remove Friend"}
        />
      </div>
    </li>
  )
}

export default withRouter(Friend);