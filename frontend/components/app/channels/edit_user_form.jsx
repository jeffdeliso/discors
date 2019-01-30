import React from 'react';

class EditUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      active: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
      this.setState({ active: true });
  }

  handleMouseLeave() {
      this.setState({ active: false });
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

      this.setState({ photoFile: file, photoUrl: fileReader.result });
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
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <p>{this.state.active ? 'CHANGE \n AVATAR' : ''}</p>
              <input type="file" />
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
