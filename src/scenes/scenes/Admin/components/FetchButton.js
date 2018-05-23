import React, { Component } from 'react';

class FetchButton extends Component {

  onSubmitHandler(e) {
    e.preventDefault();

    fetch('http://192.168.1.203/regg/index.php/api/projectsApi/view/1/regg/index.php/api/projectsApi/view/1')
    .then(res => res.json())
    .then(data => {
      console.log(data.title)
    })

    console.log('test');
  }

  render() {
    return(
      <form className="form-group" onSubmit={this.onSubmitHandler.bind(this)}>
        <button type="submit" className="btn btn-primary">Fetch data</button>
      </form>
    )
  }
}

export default FetchButton;
