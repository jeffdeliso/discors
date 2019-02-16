import React from 'react';
import { withRouter } from 'react-router-dom';

class JoinServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  update() {
    return e => this.setState({
      name: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.joinServer(this.state).then(this.handleRedirect);
  }

  handleRedirect(action) {
    this.props.closeModal();
    this.props.history.push(`/channels/${action.server.id}/${action.server.root_channel}`);
  }

  render() {
    return (
      <form className="create-server-form" onSubmit={this.handleSubmit}>
        <div className="create-server-form-top">
          <h5 id="join-server-header">JOIN A SERVER</h5>
          <p id="join-server-message">Enter a server name below to join an existing server.</p>
          <div className="create-server-form-input">
            <label id={this.props.errors[0] ? 'server-errors' : ''}>SERVER NAME
              <span>{this.props.errors[0] ? `  -  ${this.props.errors[0]}` : ''}</span>
            </label>
            <input id="join-server-text-input" type="text" placeholder="Enter a server name" onChange={this.update()} ref={(input) => { this.nameInput = input; }} />
          </div>
        </div>
        
        <div className="create-server-form-bottom" style={{marginTop: '105px'}}>
          <button id="join-server-button">Join</button>
        </div>
      </form>
    )
  }
}

export default withRouter(JoinServerForm);
