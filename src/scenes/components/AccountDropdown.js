import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

class AccountDropdown extends Component {
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
    if(!this.props.accountInfo) {
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
    else {

    }
  }
}

export default AccountDropdown;
