import React from 'react';

const RightArrow = (props) => {
  return(
    <div className="nextArrow" onClick={props.nextSlide}>
      <i className="fa fa-angle-right fa-3x" aria-hidden="true"></i>
    </div>
  );
}

export default RightArrow;
