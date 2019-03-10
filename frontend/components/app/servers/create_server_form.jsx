import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      avatarFile: null,
      avatarUrl: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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

  handleRedirect(action) {
    this.props.closeModal();
    this.props.history.push(`/channels/${action.server.id}/${action.server.root_channel}`);
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ avatarFile: file, avatarUrl: fileReader.result });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleRemove(e) {
    this.setState({ avatarFile: null, avatarUrl: null });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('server[name]', this.state.name);

    if (this.state.avatarFile) {
      formData.append('server[icon]', this.state.avatarFile);
    }

    this.props.createServer(formData).then(this.handleRedirect);
  }

  render() {
    return (
      <form className="create-server-form" onSubmit={this.handleSubmit}>
        <div className="create-server-form-top">
          <h5>CREATE YOUR SERVER</h5>
          <p>By creating a server you will have access to free text chat to use amongst your friends.</p>
          <div className="create-server-input-container">
            <div className="create-server-form-input">
              <label id={this.props.errors[0] ? 'server-errors' : ''}>SERVER NAME
              <span>{this.props.errors[0] ? `  -  ${this.props.errors[0]}` : ''}</span>
              </label>
              <input type="text" placeholder="Enter a server name" onChange={this.update} ref={(input) => { this.nameInput = input; }} />
            </div>
            <div className="avatar-container" id="icon-container">
              <div
                className="avatar-wrapper"
                id="icon-wrapper"
                style={this.state.avatarUrl ? { backgroundImage: `url(${this.state.avatarUrl})` } : { backgourndColor: '#7289da' }}
              >
                <p>{'CHANGE \n ICON'}</p>
                <input type="file" onChange={this.handleFile} onKeyDown={(e) => e.preventDefault()} multipleaccept=".jpg,.jpeg,.png,.gif" />
                <div className="add-file-icon"></div>
              </div>
              {this.state.avatarUrl ? <button
                className="remove-avatar-button"
                type="button"
                onClick={this.handleRemove}
              >REMOVE</button> : null}
            </div>
          </div>
        </div>
        
        <div className="create-server-form-bottom">
          <button>Create</button>
        </div>
      </form>
    )
  }
}

export default withRouter(CreateServerForm);
