import React, { Component } from 'react';
import FetchButton from './components/FetchButton';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    accountInfo: state.account
  }
}

class ConnectedAdmin extends Component {
render() {
    return(
      <div id="page_home">
        { !this.props.accountInfo && <Redirect to='/account/login' />}
        <div className="container">
          <div className="row content_row_main d-flex justify-content-center mt-3">
            <h1> Admin </h1>
          </div>
          <div className="row content_row_1 mt-3 d-flex flex-column align-content-center">
            <FetchButton name="fetch button" />
            {this.props.accountInfo ? <p>{this.props.accountInfo.user.username}</p> : null}
          </div>
        </div>
      </div>

    );
  }
};

const Admin = connect(mapStateToProps)(ConnectedAdmin);

export default Admin;
