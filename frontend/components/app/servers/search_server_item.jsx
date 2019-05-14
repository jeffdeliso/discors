import React from 'react';
import { withRouter } from 'react-router-dom';

function SearchServerItem(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.joinServer({ name: props.server.name }, props.currentUserId).then(handleRedirect);
  }

  const handleRedirect = (action) => {
    props.closeModal();
    props.history.push(`/channels/${action.server.id}/${action.server.root_channel}`);
  }


  return (
    <button type="button" className="channel" id="search-server-item" onClick={handleSubmit}>
      <div className="server-member-img" style={props.server.icon_url ?
        { backgroundImage: `url(${props.server.icon_url})`, backgroundSize: '100%', marginLeft: 0 } :
        { backgroundSize: '100%', marginLeft: 0 }}></div>
      <div className="channel-name">{props.server.name}</div>
    </button>
  )
};

export default withRouter(SearchServerItem);