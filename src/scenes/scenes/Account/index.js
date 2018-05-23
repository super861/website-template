import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    accountInfo: state.account
  }
}

class ConnectedAccount extends Component {
  render() {
    if(!this.props.accountInfo) {
      return(
        <Redirect to='/account/login' />
      );
    } else {
      return(
        <div className="container">
          <h1>{this.props.accountInfo.user.username}</h1>
        </div>

      );
    }

    // return(
    //   <div>
    //     { !this.props.accountInfo && <Redirect to='/account/login' /> }
    //     <div className="container">
    //       <h1>{this.props.accountInfo.user.username}</h1>
    //     </div>
    //   </div>
    //
    // );
  }
}

const Account = connect(mapStateToProps)(ConnectedAccount);

export default Account;
