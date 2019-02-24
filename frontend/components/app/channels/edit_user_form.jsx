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
    this.handleRemove = this.handleRemove.bind(this);
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

  handleRemove(e) {
    this.setState({ avatarFile: null, avatarUrl: null });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user[username]', this.state.username);
    formData.append('user[email]', this.state.email);
    formData.append('user[id]', this.props.currentUser.id);

    if (this.state.avatarFile) {
      formData.append('user[avatar]', this.state.avatarFile);
    }

    this.props.editUser(formData).then(this.props.closeModal);
  }

  render() {
    const emailError = this.props.errors.find((el) => el.includes('Email') || el.includes('demo'));
    const usernameError = this.props.errors.find((el) => el.includes('Username') || el.includes('demo'));
    const { avatarUrl, username, email } = this.state;

    return (
      <form className="edit-user-form" onSubmit={this.handleSubmit}>
        <div className="edit-user-form-top">
          <div className="avatar-container">
            <div
              className="avatar-wrapper"
              style={{ backgroundImage: `url(${avatarUrl ? avatarUrl : this.props.currentUser.image_url})` }}
            >
              <p>{'CHANGE \n AVATAR'}</p>
              <input type="file" onChange={this.handleFile} onKeyDown={(e) => e.preventDefault()} multipleaccept=".jpg,.jpeg,.png,.gif" />
              <div className="add-file-icon"></div>
            </div>
            {avatarUrl ? <button
              type="button"
              className="remove-avatar-button"
              onClick={this.handleRemove}
              onKeyDown={(e) => e.preventDefault()}
            >REMOVE</button> : null}
          </div>
          <div className="edit-user-username-email">
            <div className="email-container">
              <div className="session-error-wrapper">
                <h5 className={`email-label ${usernameError ? 'session-error-label' : ''}`}>USERNAME</h5>
                <span className="session-errors">{usernameError ? `-  ${usernameError}` : ''}</span>
              </div>
              <input type="text"
                value={username}
                onChange={this.update('username')}
                className={usernameError ? 'session-error' : 'session-input'}
              />
            </div>
            <div className="email-container">
              <div className="session-error-wrapper">
                <h5 className={`email-label ${emailError ? 'session-error-label' : ''}`}>EMAIL</h5>
                <span className="session-errors">{emailError ? `-  ${emailError}` : ''}</span>
              </div>
              <input type="text"
                value={email}
                onChange={this.update('email')}
                className={emailError ? 'session-error' : 'session-input'}
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
