import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginAsGuest = this.loginAsGuest.bind(this);
    this.loginAsGuestHelper = this.loginAsGuestHelper.bind(this);
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

  loginAsGuest(e) {
    e.preventDefault();
    const username = 'guest'.split('');
    const password = 'starwars'.split('');
    const submit = document.getElementById('session-submit');
    this.setState({ username: '', password: '' }, () =>
      this.loginAsGuestHelper(username, password, submit)
    );
  }

  loginAsGuestHelper(username, password, submit) {
    if (username.length > 0) {
      this.setState(
        { username: this.state.username + username.shift() }, () => {
          window.setTimeout(() =>
            this.loginAsGuestHelper(username, password, submit), 50);
        }
      );
    } else if (password.length > 0) {
      this.setState(
        { password: this.state.password + password.shift() }, () => {
          window.setTimeout(() =>
            this.loginAsGuestHelper(username, password, submit), 50);
        }
      );
    } else {
      submit.click();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state).then(() => this.props.history.push('/channels/@me'));
  }

  render() {
    return (
      <div className="login-body">
        <img src="/assets/login/background.jpg" alt="" className="background-image"></img>
        <img src="/assets/login/discors.svg" alt="" className="login-logo"></img>
        <form action="" className="login-form" onSubmit={this.handleSubmit}>
          <div className="login-form-inner">
            <h3 className="form-header">Welcome back!</h3>
            <h4 className="login-form-subtitle">We're so excited to see you again!</h4>
            <div className="form-input">
              <div className="email-container">
                <div className="session-error-wrapper">
                  <h5 className={`email-label ${this.props.errors[0] ? 'session-error-label' : ''}`}>USERNAME</h5>
                  <span className="session-errors">{this.props.errors[0] ? `- ${this.props.errors[0]}` : ''}</span>
                </div>
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  className={this.props.errors[0] ? 'session-error' : 'session-input'}
                  ref={(input) => { this.nameInput = input; }}
                />
              </div>
              <div>
                <h5 className={`password-label ${this.props.errors[0] ? 'session-error-label' : ''}`}>PASSWORD</h5>
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  id="password-container"
                  className={this.props.errors[0] ? 'session-error' : 'session-input'}
                />
              </div>
              <div className="forgot-password-container">
                <button id="demo" onClick={this.loginAsGuest}>Demo User</button>
              </div>
              <button id="session-submit">Login</button>
              <div className="need-account">
                <span>Need an account?</span>
                <Link to="/register" onClick={() => this.props.removeErrors()}>Register</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm;