import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  render() {
    return (
      <div className="login-body">
        <img src="/assets/login/background.jpg" alt="" className="background-image"></img>
        <img src="/assets/login/discors.svg" alt="" className="login-logo"></img>
        <form action="" className="login-form">
          <div className="login-form-inner">
            <h3 className="form-header">Welcome back!</h3>
            <h4 className="login-form-subtitle">We're so excited to see you again!</h4>
            <div className="form-input">
              <div className="email-container">
                <h5 className="email-label">EMAIL</h5>
                <input type="email" name="" id=""></input>
              </div>
              <div>
                <h5>PASSWORD</h5>
                <input type="password" id="password-container"></input>
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