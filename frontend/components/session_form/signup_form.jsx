import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  render() {
    return (
      <div className="login-body">
        <img src="/assets/login/background.jpg" alt="" className="background-image"></img>
        <img src="/assets/login/discors.svg" alt="" className="login-logo"></img>
        <form action="" className="login-form">
          <div className="login-form-inner">
            <h3 className="form-header">Create an account</h3>
            <div className="form-input">
              <div className="email-container">
                <h5 className="email-label">EMAIL</h5>
                <input type="email" name="" id=""></input>
              </div>
              <div>
                <h5>USERNAME</h5>
                <input type="text" name="" id=""></input>
              </div>
              <div>
                <h5>PASSWORD</h5>
                <input type="password" name="" id=""></input>
              </div>
              <button>Register</button>
              <div className="need-account">
                <Link to="/login">Already have an account?</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SignupForm;