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
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
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
                <a href="">Forgot your password?</a>
              </div>
              <button>Login</button>
              <div className="need-account">
                <span>Need an account?</span>
                <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm;