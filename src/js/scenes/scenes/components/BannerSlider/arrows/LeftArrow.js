import React from 'react';

const LeftArrow = (props) => {
  return(
    <div className="nextArrow" onClick={props.previousSlide}>
      <i className="fa fa-angle-left fa-2x" aria-hidden="true"></i>
    </div>
  );
}

export default LeftArrow;
