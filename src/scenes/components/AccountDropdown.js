import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    status: state.status,
    account: state.account
  }
}

class ConnectedAccountDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false
    }

    this.toggle= this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    if(this.props.status === "LOGIN_SUCCESFULL") {
      return(
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle nav caret>
            {this.props.account.username}
          </DropdownToggle>
          <DropdownMenu>
            <div className="nav-item" onClick={this.toggle}>
              <Link className="nav-link" to="/account">Profile</Link>
            </div>
            <div className="nav-item" onClick={this.toggle}>
              <Link className="nav-link" to="/">Nog iets</Link>
            </div>
          </DropdownMenu>
        </Dropdown>
      );
    }
    else {
      return(
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle nav caret>
            Account
          </DropdownToggle>
          <DropdownMenu>
            <div className="nav-item" onClick={this.toggle}>
              <Link className="nav-link" to="/account/login">Login</Link>
            </div>
            <div className="nav-item" onClick={this.toggle}>
              <Link className="nav-link" to="/account/register">Register</Link>
            </div>
          </DropdownMenu>
        </Dropdown>
      );
    }
  }
}

const AccountDropdown = connect(mapStateToProps)(ConnectedAccountDropdown);

export default AccountDropdown;
