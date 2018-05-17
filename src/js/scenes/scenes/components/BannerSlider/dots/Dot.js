import React from 'react';

const Dot = (props) => {
  return(
    <div className="dot">
      {props.active ? <i class="fas fa-circle fa-2x"></i> : <i class="far fa-circle fa-2x"></i>}
    </div>
  );
}

export default Dot
