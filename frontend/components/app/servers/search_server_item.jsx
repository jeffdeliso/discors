import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchServerItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.joinServer({name: this.props.server.name}, this.props.currentUserId).then(this.handleRedirect);
  }

  handleRedirect(action) {
    this.props.closeModal();
    this.props.history.push(`/channels/${action.server.id}/${action.server.root_channel}`);
  }


  render() {
    return (
      <button type="button" className="channel" id="search-server-item" onClick={this.handleSubmit}>
        <div className="server-member-img" style={this.props.server.icon_url ?
          { backgroundImage: `url(${this.props.server.icon_url})`, backgroundSize: '100%', marginLeft: 0 } :
          { backgroundSize: '100%', marginLeft: 0 }}></div>
        <div className="channel-name">{this.props.server.name}</div>
      </button>
    )
  };
};

export default withRouter(SearchServerItem);