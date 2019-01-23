import React from 'react';

class CreateServerForm extends React.Component {
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
          <h5>CREATE YOUR SERVER</h5>
          <p>By creating a server you will have access to free text chat to use amongst your friends.</p>
          <div className="create-server-form-input">
            <label>SERVER NAME</label>
            <input type="text" placeholder="Enter a server name" onChange={this.update()} ref={(input) => { this.nameInput = input; }} />
          </div>
        </div>

        <div className="create-server-form-bottom">
          <button>Create</button>
        </div>
      </form>
    )
  }
}

export default CreateServerForm;
