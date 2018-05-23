import React, { Component } from 'react';
import FetchButton from './components/FetchButton';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      buttonClicked: false
    }

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    this.setState({
      buttonClicked: true
    })
  }

  render() {
    return(
      <div id="page_home">
        <div className="container">
          <div className="row content_row_main d-flex justify-content-center mt-3">
            <h1> Admin </h1>
          </div>
          <div className="row content_row_1 mt-3 d-flex flex-column align-content-center">
            <FetchButton click={this.fetchData} />
            {this.state.buttonClicked ? <p>clicked</p> : <p>not clicked</p>}
          </div>
        </div>
      </div>

    );
  }
};

export default Admin;
