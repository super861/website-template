import React, { Component } from 'react';
import FetchButton from './components/FetchButton';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    accountInfo: state.account
  }
}

class ConnectedAdmin extends Component {
  constructor() {
    super();
    
  }

  render() {
    return(
      <div id="page_home">
        <div className="container">
          <div className="row content_row_main d-flex justify-content-center mt-3">
            <h1> Admin </h1>
          </div>
          <div className="row content_row_1 mt-3 d-flex flex-column align-content-center">
            <FetchButton />
            {this.props.accountInfo ? <p>{this.props.accountInfo.user.username}</p> : null}
          </div>
        </div>
      </div>

    );
  }
};

const Admin = connect(mapStateToProps)(ConnectedAdmin);

export default Admin;
