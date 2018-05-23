import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FetchButton from '../Admin/components/FetchButton';

const mapStateToProps = state => {
  return {
    accountInfo: state.account
  }
}

class ConnectedLogin extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };
  }

  loginOnChangeHandler(e) {
    this.setState({
      username: e.target.value
    })
  }

  passwordOnChangeHandler(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmitHandler(e) {
    let pass = this.state.password;
    console.log(pass)
    e.preventDefault();

  }

  render() {
    return(
      <div id="page_login" className="container" onSubmit={this.onSubmitHandler.bind(this)}>
        { this.props.accountInfo && <Redirect to='/account' /> }
        <div className="row col-md-6 offset-md-3">
          <form className="form-group mt-5 border p-3">
            <div className="row">
              <div className="col-md-9 offset-md-3 mb-3">
                <h2>Please Login</h2>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="inputUsername">Username:</label>
              </div>
              <div className="col-md-9">
                <input type="text" className="form-control" id="inputUsername" placeholder="User" onChange={this.loginOnChangeHandler.bind(this)} value={this.state.username} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="inputPassword">Password:</label>
              </div>
              <div className="col-md-9">
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={this.passwordOnChangeHandler.bind(this)} value={this.state.password} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="row col-md-9 offset-md-3">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </div>
            <div className="row">
              <div className="row col-md-9 offset-md-3">
                <FetchButton name="Fake login" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const Login = connect(mapStateToProps)(ConnectedLogin);

export default Login;
