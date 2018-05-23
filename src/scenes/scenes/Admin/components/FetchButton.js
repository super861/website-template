import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadData } from '../../../../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(loadData())
  }
}

class ConnectedFetchButton extends Component {

  onClickHandler(e) {
    e.preventDefault();
    // this.props.loadData().then(() => {
    // });
    this.props.loadData();
  }

  render() {
    return(
      <button type="submit" className="btn btn-primary" onClick={this.onClickHandler.bind(this)}>{this.props.name}</button>
    )
  }
}

const FetchButton = connect(null, mapDispatchToProps)(ConnectedFetchButton);

export default FetchButton;
