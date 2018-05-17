import React from 'react';

const Slide = (props) => {

  let background = {
    backgroundImage: `url(${props.imgpath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: `${props.zindex}`,
    marginLeft: `${props.marginleft}`,
    transition: `all ${props.time}ms ease-in-out`
  }

  return <div className="slide" id={props.slideId} style={background}></div>
}

export default Slide;
