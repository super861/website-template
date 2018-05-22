import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slide from './slide/Slide';
import RightArrow from './arrows/RightArrow';
import LeftArrow from './arrows/LeftArrow';
import Dot from './dots/Dot';

const mapStateToProps = state => {
  return {
    images: state.bannerImages
  }
}

class ConnectedBannerSlider extends Component {
  constructor(props) {
      super(props);

      this.state = {
        slideCount: 0,
        lastCount: 1,
        bannerStyle: {
          height: "640px"
        },
        fade: false,
        images: [...this.props.images],
        zindex: '1',
        marginleft: '0px',
        time: '0',
        maxTime: '1000',
        clickable: true,
        autoPlay: true,
        dotSlide: '0'
      };

      this.nextSlide = this.nextSlide.bind(this);
      this.previousSlide = this.previousSlide.bind(this);
      this.getSlide = this.getSlide.bind(this);
      this.tempSlide = this.tempSlide.bind(this);
      this.autoPlay = this.autoPlay.bind(this);
      this.getDots = this.getDots.bind(this);
      this.goToSlide = this.goToSlide.bind(this);


      if(this.state.autoPlay) {
        this.autoPlay();
      }
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide()
    }, 10000);
  }

  newSlideCount(slideCount) {
    if(this.state.direction === 'right') {
      if(slideCount + 1 >= this.state.images.length) {
        return 0;
      }
      else {
        return slideCount + 1;
      }
    }
    else if(this.state.direction === 'left') {
      if(slideCount - 1 < 0) {
        return this.state.images.length - 1;
      }
      else {
        return slideCount - 1;
      }
    }
    else if(this.state.direction === 'dot') {
      return this.state.dotSlide;
    }

  }

  nextSlide() {
    if(!this.state.clickable) {
      return null;
    }

    this.setState({
      fade: true,
      zindex: '2',
      marginleft: '1920px',
      time: this.state.maxTime,
      clickable: false,
      direction: 'right'
    })

    setTimeout(() => {
      let newSlideCount = this.newSlideCount(this.state.slideCount);
      this.setState({
        fade: false,
        zindex: '1',
        marginleft: '0px',
        time: '0',
        slideCount: newSlideCount,
        clickable: true
      })
    }, this.state.maxTime)

  }

  previousSlide() {
    if(!this.state.clickable) {
      return null;
    }

    this.setState({
      fade: true,
      zindex: '2',
      marginleft: '-1920px',
      time: this.state.maxTime,
      clickable: false,
      direction: 'left'
    })

    setTimeout(() => {
      let newSlideCount = this.newSlideCount(this.state.slideCount);
      this.setState({
        fade: false,
        zindex: '1',
        marginleft: '0px',
        time: '0',
        slideCount: newSlideCount,
        clickable: true
      })
    }, this.state.maxTime)

  }

  goToSlide(e) {
    if(!this.state.clickable) {
      return null;
    }

    let newSlide = Number(e.target.id);
    this.setState({
      fade: true,
      zindex: '2',
      marginleft: '1920px',
      time: this.state.maxTime,
      clickable: false,
      direction: 'dot',
      dotSlide: newSlide
    })

    setTimeout(() => {
      this.setState({
        fade: false,
        zindex: '1',
        marginleft: '0px',
        time: '0',
        slideCount: newSlide,
        clickable: true
      })
    }, this.state.maxTime)
  }

  getSlide(idx) {
    return <Slide imgpath={this.state.images[idx]} zindex={this.state.zindex} marginleft={this.state.marginleft} time={this.state.time} />
  }

  tempSlide() {
    let idx = this.newSlideCount(this.state.slideCount);
    return <Slide imgpath={this.state.images[idx]} zindex='1' marginleft="0px" time="0" />
  }

  getDots() {
    const listItems = this.state.images.map((img, index) =>
      <li className="mr-2 mr-1" key={'dot' + index}>
        {index === this.state.slideCount ? <Dot active={true} slide={index} goToSlide={this.goToSlide} /> : <Dot active={false} slide={index} goToSlide={this.goToSlide} /> }
      </li>
    );
    return(
      <ul className="dots">
        {listItems}
      </ul>
    );
  }

  render() {
    return(
      <div className="banner" style={this.state.bannerStyle}>
        { this.state.fade === true ? this.tempSlide() : null}
        {this.getSlide(this.state.slideCount)}
        <div className="banner-controls">
          <LeftArrow previousSlide={this.previousSlide} />
          { this.getDots() }
          <RightArrow nextSlide={this.nextSlide} />
        </div>
      </div>

    );
  }
}

const BannerSlider = connect(mapStateToProps)(ConnectedBannerSlider);

export default BannerSlider;
