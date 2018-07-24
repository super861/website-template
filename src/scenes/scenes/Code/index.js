import React from 'react'
import Highlight from 'react-highlight'

const Code = () => (
  <div id="page_code" className="container">
    <div className="col">
      <Highlight language="javascript">
        {`import React from 'react';

        const LeftArrow = (props) => {
          return(
            <div className="nextArrow" onClick={props.previousSlide}>
              <i className="fa fa-angle-left fa-2x" aria-hidden="true"></i>
            </div>
          );
        }

        export default LeftArrow;
  `}
      </Highlight>
    </div>
    <div className="col">
      <Highlight language="javascript">
        {`import React from 'react';

        const RightArrow = (props) => {
          return(
            <div className="nextArrow" onClick={props.nextSlide}>
              <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
            </div>
          );
        }

        export default RightArrow;
`}
      </Highlight>
    </div>

  </div>
)

export default Code;
