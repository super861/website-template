// src/js/scenes/components/Header.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from './components/AccountDropdown';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

class Header extends Component {
   constructor() {
      super();

      this.state = {
        dropdownOpen: false
      }

      this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return(
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <span className="h1 navbar-brand mr-5">Logo</span>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active mr-3">
                  <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item mr-3">
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle nav caret>
                      Code examples
                    </DropdownToggle>
                    <DropdownMenu>
                      <div className="nav-item" onClick={this.toggle}>
                        <Link className="nav-link" to="/code/scope">Scope</Link>
                      </div>
                      <div className="nav-item" onClick={this.toggle}>
                        <Link className="nav-link" to="/code/prototype">Prototype</Link>
                      </div>
                      <div className="nav-item" onClick={this.toggle}>
                        <Link className="nav-link" to="/code/classes">Classes</Link>
                      </div>
                      <div className="nav-item" onClick={this.toggle}>
                        <Link className="nav-link" to="/code/promise">Promise</Link>
                      </div>
                      <div className="nav-item" onClick={this.toggle}>
                        <Link className="nav-link" to="/code/blackjack">Blackjack</Link>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </li>
                <li className="nav-item mr-3">
                  <Link className="nav-link" to="/Referencelist">Reference list</Link>
                </li>
                <li className="nav-item mr-3">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
                {/*LAST*/}
                <li className="nav-item">
                  <AccountDropdown />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
