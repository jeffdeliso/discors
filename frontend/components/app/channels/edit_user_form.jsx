import React from 'react';

class EditUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      avatarFile: null,
      avatarUrl: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
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

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="edit-user-form" onSubmit={this.handleSubmit}>
        <div className="edit-user-form-top">
          <div className="avatar-container">
            <div
              className="avatar-wrapper"
              style={{ backgroundImage: `url(${this.state.avatarUrl ? this.state.avatarUrl : this.props.currentUser.image_url})` }}
            >
              <p>{'CHANGE \n AVATAR'}</p>
              <input type="file" onChange={this.handleFile}/>
              <div className="add-file-icon"></div>
            </div>
          </div>
          <div className="edit-user-username-email">
            <div className="email-container">
              <div className="session-error-wrapper">
                <h5 className={`email-label ${this.props.errors[0] ? 'session-error-label' : ''}`}>USERNAME</h5>
                <span className="session-errors">{this.props.errors[0] ? `- ${this.props.errors[0]}` : ''}</span>
              </div>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className={this.props.errors[0] ? 'session-error' : 'session-input'}
              />
            </div>
            <div className="email-container">
              <div className="session-error-wrapper">
                <h5 className={`email-label ${this.props.errors[0] ? 'session-error-label' : ''}`}>EMAIL</h5>
                <span className="session-errors">{this.props.errors[0] ? `- ${this.props.errors[0]}` : ''}</span>
              </div>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className={this.props.errors[0] ? 'session-error' : 'session-input'}
              />
            </div>
          </div>
        </div>
        <div className="edit-user-form-bottom">
          <div className="edit-user-button-container">
            <button
              type="button"
              className="create-channel-cancel"
              onClick={this.props.closeModal}
              style={{ height: 'auto' }}
            >Cancel</button>
            <button className="edit-user-button">Save</button>
          </div>
        </div>
      </form >
    )
  }
}

export default EditUserForm;
