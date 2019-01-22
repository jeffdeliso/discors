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
    return (
      <div className="login-body">
        <img src="/assets/login/background.jpg" alt="" className="background-image"></img>
        <img src="/assets/login/discors.svg" alt="" className="login-logo"></img>
        <form action="" className="login-form" onSubmit={this.handleSubmit}>
          <div className="login-form-inner">
            <h3 className="form-header">Create an account</h3>
            <div className="form-input">
              <div className="email-container">
                <h5 className="email-label">EMAIL</h5>
                {/* <input type="email" name="" id=""></input> */}
                <input type="email"
                  value={this.state.email}
                  onChange={this.update('email')}
                />
              </div>
              <div>
                <h5>USERNAME</h5>
                {/* <input type="text" name="" id=""></input> */}
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                />
              </div>
              <div>
                <h5>PASSWORD</h5>
                {/* <input type="password" name="" id=""></input> */}
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                />
              </div>
              {/* <input type="submit" value="Register" className="submit-button"/> */}
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