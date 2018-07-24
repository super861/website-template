import React from 'react'
import Highlight from 'react-highlight'

const Prototype = () => (
  <div id="page_code" className="container mt-3">
    <div className="col border">
      <h4>Wat is een reference type?</h4>
      <ul>
        <li>Een datatype dat verwijst naar een object in het geheugen</li>
        <li>Is nie teen daadwerkelijke object</li>
        <li>Objceten zijn gebaseerd op dit object</li>
      </ul>
    </div>

    <div className="col border mt-3">
      <h4>Reference type definiëren</h4>
      <Highlight language="javascript">
      {`  Function Persoon(voornaam, achternaam) {
          this.voornaam = voornaam;
          this.achternaam = achternaam;
        }

        var gary = new Persoon('Gary', 'Kertopermono');
        console.log(gary.voornaam, gary.achternaam);`}
      </Highlight>
    </div>

    <div className="col border mt-3">
      <h4>Prototype</h4>
      <Highlight language="javascript">
        {`Persoon.prototype.krijgVolledigeNaam = function() {
          return this.voornaam + ' ' + this.achternaam;
        }

        console.log(gary.krijgVolledigeNaam());`}
      </Highlight>
    </div>

    <div className="col border mt-3 mb-3">
      <h4>Nieuwe prototypes op bestaande objecten</h4>
      <ul>
        <li>Alle objecten van hetzelfde type delen dezelfde prototype</li>
        <li>Aanpassingen aan het prototype hefet effect op bestaande objecten</li>
        <li>Kan worden toegepast op built-in objecten</li>
        <li><b>Niet aangeraden</b></li>
      </ul>
    </div>


  </div>
)

export default Prototype;
