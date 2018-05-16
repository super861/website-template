// src/js/App.js

import React, { Component } from 'react';
import Header from './scenes/components/Header.js';
import Footer from './scenes/components/Footer.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
