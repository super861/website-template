import React, { Component } from 'react';
import BannerSlider from '../components/BannerSlider/BannerSlider';

class Home extends Component {
  constructor(props) {
    super(props)

    this.toggle= this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return(
      <div>
        <div id="page_home">
          <BannerSlider />
        </div>
      </div>

    );
  }
}

export default Home;
