// src/js/App.js

import React, { Component } from 'react';
import Header from './scenes/Header.js';
import Footer from './scenes/Footer.js';
import Main from './scenes/Main.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
