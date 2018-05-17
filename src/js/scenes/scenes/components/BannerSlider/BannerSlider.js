import React, { Component } from 'react';
import Slide from './slide/Slide';
import RightArrow from './arrows/RightArrow';
import LeftArrow from './arrows/LeftArrow';

class BannerSlider extends Component {
  constructor() {
      super();

      this.state = {
        slideCount: 0,
        lastCount: 1,
        bannerStyle: {
          height: "640px"
        },
        fade: false,
        images: [
          "images/banner/firstslide.png",
          "images/banner/secondslide.png",
          "images/banner/thirdslide.png"
        ],
        zindex: '1',
        marginleft: '0px',
        time: '0',
        maxTime: '1000',
        clickable: true,
        autoPlay: true
      };

      this.nextSlide = this.nextSlide.bind(this);
      this.previousSlide = this.previousSlide.bind(this);
      this.getSlide = this.getSlide.bind(this);
      this.tempSlide = this.tempSlide.bind(this);
      this.autoPlay = this.autoPlay.bind(this);


      if(this.state.autoPlay) {
        this.autoPlay();
      }
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide()
    }, 10000);
  }

  newSlideCount(slideCount, direction) {
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

  getSlide(idx) {
    return <Slide imgpath={this.state.images[idx]} zindex={this.state.zindex} marginleft={this.state.marginleft} time={this.state.time} />
  }

  tempSlide() {
    let idx = this.newSlideCount(this.state.slideCount);
    return <Slide imgpath={this.state.images[idx]} zindex='1' marginleft="0px" time="0" />
  }

  render() {
    return(
      <div className="banner" style={this.state.bannerStyle}>
        { this.state.fade === true ? this.tempSlide() : null}
        {this.getSlide(this.state.slideCount)}
        <div className="banner-controls">
          <LeftArrow previousSlide={this.previousSlide} />
          <RightArrow nextSlide={this.nextSlide} />
        </div>
      </div>

    );
  }
}

export default BannerSlider;
