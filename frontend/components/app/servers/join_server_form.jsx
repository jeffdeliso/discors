import React from 'react';

class JoinServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  render() {
    return (
      <form className="create-server-form" onSubmit={this.handleSubmit}>
        <div className="create-server-form-top">
          <h5 id="join-server-header">JOIN A SERVER</h5>
          <p id="join-server-message">Enter a server name below to join an existing server.</p>
          <div className="create-server-form-input">
            <label>SERVER NAME</label>
            <input type="text" placeholder="Enter a server name" onChange={this.update()} ref={(input) => { this.nameInput = input; }} />
          </div>
        </div>

        <div className="create-server-form-bottom">
          <button id="join-server-button">Create</button>
        </div>
      </form>
    )
  }
}

export default JoinServerForm;
