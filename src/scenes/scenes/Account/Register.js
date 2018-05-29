import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../../actions/index';

const mapStateToProps = state => {
  return {
    status: state.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: data => dispatch(register(data))
  }
}

class ConnectedRegister extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      passwordRepeat: '',
      validateUsernameString: '',
      validatePasswordString: '',
      passwordMatchString: ''
    };

    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatePasswordMatch = this.validatePasswordMatch.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  validateUsername(username) {
    if(username.length < 4) {
      this.setState({ validateUsernameString: <label className="text-danger">Invalid username. too short</label> })
      return false;
    }
    else if(username.length >= 4 && username.length <= 12) {
      this.setState({ validateUsernameString: <label className="text-success">Valid username</label>})
      return true;
    }
    else if(username.length > 12) {
      this.setState({ validateUsernameString: <label className="text-danger">Invalid username. too long</label>})
      return false;
    }
  }

  validatePassword(password) {
    if(password.length < 6) {
      this.setState({ validatePasswordString: <label className="text-danger">invalid password. too small</label> })
      return false;
    }
    else if(password.length >= 6 && password.length < 21) {
      this.setState({ validatePasswordString: <label className="text-success">Valid password</label> })
      return true;
    }
    else {
      this.setState({ validatePasswordString: <label className="text-danger">invalid password. too long</label> })
      return false;
    }
  }

  validatePasswordMatch(pass1, pass2) {
    if(pass1 === pass2) {
      this.setState({ passwordMatchString: <label className="text-success">Passwords match</label>})
      return true;
    }
    else {
      this.setState({ passwordMatchString: <label className="text-danger">Passwords don't match</label>})
      return false;
    }
  }

  usernameOnChangeHandler(e) {
    this.validateUsername(e.target.value);

    this.setState({
      username: e.target.value
    })
  }

  passwordOnChangeHandler(e) {
    this.validatePassword(e.target.value)

    this.setState({
      password: e.target.value
    })
  }

  passwordRepeatOnChangeHandler(e) {
    this.validatePasswordMatch(this.state.password, e.target.value)

    this.setState({
      passwordRepeat: e.target.value
    })
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if(this.validateUsername(this.state.username) && this.validatePassword(this.state.password) && this.validatePasswordMatch(this.state.password, this.state.passwordRepeat)) {
      console.log('yes')
      this.sendData();
    }
    else {
      console.log('no')
    }

  }

  sendData() {
    const data = {
        username: this.state.username,
        password: this.state.password
      }

      this.props.register(data)

  }

  render() {
    return(
      <div id="page_login" className="container" onSubmit={this.onSubmitHandler.bind(this)}>
        { this.props.status === "LOGIN_SUCCESFULL" && <Redirect to='/account' /> }
        <div className="row col-md-8 offset-md-2">
          <form className="form-group mt-5 border p-3" >
            <div className="row">
              <div className="col-md-9 offset-md-3 mb-3">
                <h2>Register</h2>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="inputUsername">Username:</label>
              </div>
              <div className="col-md-4">
                <input name="inputUsername" type="text" className="form-control" id="inputUsername" placeholder="User" onChange={this.usernameOnChangeHandler.bind(this)} value={this.state.username} />
              </div>
              <div className="col-md-5">
                {this.state.validateUsernameString}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="inputPassword">Password:</label>
              </div>
              <div className="col-md-4">
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={this.passwordOnChangeHandler.bind(this)} value={this.state.password} />
              </div>
              <div className="col-md-5">
                {this.state.validatePasswordString}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="inputPasswordRepeat">Password-repeat:</label>
              </div>
              <div className="col-md-4">
                <input type="password" className="form-control" id="inputPasswordRepeat" placeholder="Password-repeat" onChange={this.passwordRepeatOnChangeHandler.bind(this)} value={this.state.passwordRepeat} />
              </div>
              <div className="col-md-5">
                {this.state.passwordMatchString}
              </div>
            </div>
            <div className="row mb-3">
              <div className="row col-md-9 offset-md-3">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const Register = connect(mapStateToProps, mapDispatchToProps)(ConnectedRegister);

export default Register;
