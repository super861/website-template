import React from 'react';

const Dot = (props) => {
  return(
    <div className="dot" onClick={props.goToSlide}>
      {props.active ? <i id={props.slide} className="fas fa-circle active"></i> : <i id={props.slide} className="fas fa-circle"></i>}
    </div>
  );
}

export default Dot;
