import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FetchButton from '../Admin/components/FetchButton';
import { login } from '../../../actions/index';

const mapStateToProps = state => {
  return {
    status: state.status,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data))
  }
}

class ConnectedLogin extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
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
    e.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.login(data);
    //DataApi.login(data);

  }

  render() {
    return(
      <div id="page_login" className="container" onSubmit={this.onSubmitHandler.bind(this)}>
        { this.props.status === "LOGIN_SUCCESFULL" && <Redirect to='/account' /> }
        <div className="row col-md-6 offset-md-3">
          <form className="form-group mt-5 border p-3" >
            <div className="row">
              <div className="col-md-9 offset-md-3 mb-3">
                <h2>Login</h2>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="inputUsername">Username:</label>
              </div>
              <div className="col-md-9">
                <input name="inputUsername" type="text" className="form-control" id="inputUsername" placeholder="User" onChange={this.loginOnChangeHandler.bind(this)} value={this.state.username} />
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
            <div className="row mb-3">
              <div className="row col-md-9 offset-md-3">
                <FetchButton name="Fake login" />
              </div>
            </div>
            <div className="row">
              <div className="row col-md-9 offset-md-3">
                { this.props.status === "LOGIN_UNSUCCESFULL" && <p className="text-danger"> {this.props.error} </p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);

export default Login;
