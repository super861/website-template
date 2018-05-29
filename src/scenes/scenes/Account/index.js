import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


const mapStateToProps = state => {
  console.log(state)
  return {
    status: state.status,
    account: state.account
  }
}

class ConnectedAccount extends Component {

  render() {
    if(this.props.status !== "LOGIN_SUCCESFULL") {
      return(
        <Redirect to='/account/login' />
      );
    } else if(this.props.status === "LOGIN_SUCCESFULL") {
      return(
        <div className="container">
          <h1>{this.props.account.username}</h1>
        </div>

      );
    }

    //<h1>{this.props.accountInfo.user.username}</h1>

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
