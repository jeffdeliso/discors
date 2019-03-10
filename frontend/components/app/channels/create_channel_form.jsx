import React from 'react';
import merge from 'lodash/merge';

class CreateChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  update(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(merge(this.state, {server_id: this.props.server.id})).then(this.props.closeModal);
  }

  render() {
    return (
      <form className="create-channel-form" onSubmit={this.handleSubmit}>
        <header>
          <h4>{`CREATE ${this.props.text} CHANNEL`}</h4>
          <p>in {this.props.server.name}</p>
        </header>
        <main>
          <div className="session-error-wrapper">
            <h5 className={`email-label ${this.props.errors[0] ? 'session-error-label' : ''}`}>CHANNEL NAME</h5>
            <span className="session-errors">{this.props.errors[0] ? `- ${this.props.errors[0]}` : ''}</span>
          </div>
          <input type="text"
            value={this.state.name}
            onChange={this.update}
            className={this.props.errors[0] ? 'session-error' : 'session-input'}
            ref={(input) => { this.nameInput = input; }}
          />
        </main>
        <div className="create-channel-form-bottom">
          <button type="button" className="create-channel-cancel" onClick={this.props.closeModal}>Cancel</button>
          <button id="session-submit">Create Channel</button>
        </div>
      </form >
    )
  }
}

export default CreateChannelForm;
