// src/js/scenes/components/Header.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from './components/AccountDropdown';

class Header extends Component {
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
                  <Link className="nav-link" to="/">Contact</Link>
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
