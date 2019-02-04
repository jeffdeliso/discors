import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.body.style = "overflow: hidden;";
    this.nameInput.focus();
  }

  componentWillUnmount() {
    document.body.removeAttribute("style");
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state).then(() => this.props.history.push('/channels/@me'));
  }

  render() {
    const emailError = this.props.errors.find((el) => el.includes('Email'));
    const usernameError = this.props.errors.find((el) => el.includes('Username'));
    const passwordError = this.props.errors.find((el) => el.includes('Password'));
    return (
      <div className="login-body">
        <img src="https://s3.amazonaws.com/discors-dev/Login/background.jpg" alt="" className="background-image"></img>
        <img src="https://s3.amazonaws.com/discors-dev/Login/discors.svg" alt="" className="login-logo"></img>
        <form action="" className="login-form" onSubmit={this.handleSubmit}>
          <div className="login-form-inner">
            <h3 className="form-header">Create an account</h3>
            <div className="form-input">
              <div className="email-container">
                <div className="session-error-wrapper">
                  <h5 className={`email-label ${emailError ? 'session-error-label' : ''}`}>EMAIL</h5>
                  <span className="session-errors">{emailError ? `-  ${emailError}` : ''}</span>
                </div>
                <input type="email"
                  value={this.state.email}
                  onChange={this.update('email')}
                  className={emailError ? 'session-error' : 'session-input'}
                  ref={(input) => { this.nameInput = input; }}
                />
              </div>
              <div>
                <div className="session-error-wrapper">
                  <h5 className={`email-label ${usernameError ? 'session-error-label' : ''}`}>USERNAME</h5>
                  <span className="session-errors">{usernameError ? `-  ${usernameError}` : ''}</span>
                </div>
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  className={usernameError ? 'session-error' : 'session-input'}
                />
              </div>
              <div>
                <div className="session-error-wrapper">
                  <h5 className={`email-label ${passwordError ? 'session-error-label' : ''}`}>PASSWORD</h5>
                  <span className="session-errors">{passwordError ? `-  ${passwordError}` : ''}</span>
                </div>
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className={passwordError ? 'session-error' : 'session-input'}
                  id="password-container"
                />
              </div>
              <div className="forgot-password-container">
              </div>
              <button id="session-submit">Register</button>
              <div className="need-account">
                <Link to="/login" onClick={() => this.props.removeErrors()}>Already have an account?</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SignupForm;