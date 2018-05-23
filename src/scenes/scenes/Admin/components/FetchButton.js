import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadData } from '../../../../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(loadData())
  }
}

class ConnectedFetchButton extends Component {

  onSubmitHandler(e) {
    e.preventDefault();
    // this.props.loadData().then(() => {
    // });
    this.props.loadData();
  }

  render() {
    return(
      <form className="form-group" onSubmit={this.onSubmitHandler.bind(this)}>
        <button type="submit" className="btn btn-primary">Fetch data</button>
      </form>
    )
  }
}

const FetchButton = connect(null, mapDispatchToProps)(ConnectedFetchButton);

export default FetchButton;
