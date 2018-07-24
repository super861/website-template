import React from 'react'
import Highlight from 'react-highlight'

const Scope = () => (
  <div id="page_code" className="container">
    <div className="col border mt-3">
      <h4>Scope</h4>
      <ul>
        <li>De beschikbaarheid of "zichtbaarheid: van een variable"</li>
        <ul>
          <li>Waar het kan worden gebruikt</li>
        </ul>
        <li>Beperkt het gebruik van variabelen en functies in de code</li>
      </ul>
    </div>

    <div className="col border mt-3">
      <h4>Scope closure</h4>
      <p>Wanneer een functie alles kan herinneren wat binnen zijn schope gebeurt, zelfs wanneer deze scope niet meer bestaat</p>
      <Highlight language="javascript">
        {`var bericht = "ik ben een bericht"

          function evenWachten() {
            setTimeout(() => {
              console.log(bericht)
            }, 1000);
          }

          evenWachten();

          bericht = "nu ben ik geen bericht meer"

          console.log(bericht);
          `}
      </Highlight>
    </div>

    <div className="col border mt-3">
      <h4>var, let, const</h4>
      <img src="/images/varletconst.png" alt="vars" className="img-fluid" />
    </div>

    <div className="col border mt-3 mb-3">
      <h4>Dynamische scope</h4>
      <Highlight language="javascript">
        {`var eenVariable = 2;

          function eenFunctie() {
            var eenVariable = 3;
            console.log(eenVariable);
          }

          console.log(eenVariable)
          `}
      </Highlight>
    </div>

  </div>
)

export default Scope;
