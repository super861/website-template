import React from 'react'
import Highlight from 'react-highlight'

const Classes = () => (
  <div id="page_code" className="container mt-3">
    <div className="col">
      <Highlight language="javascript">
        {`class Persoon {
    constructor(voornaam, achternaam) {
        this.voornaam = voornaam;
        this.achternaam = achternaam;
    }

    krijgVolledigeNaam() {
        return this.voornaam + ' ' + this.achternaam;
    }

    volledigeNaamLengte() {
        return this.krijgVolledigeNaam().length;
    }
}

var gary = new Persoon('Gary', 'Kertopermono');
console.log(gary.volledigeNaamLengte());
`}
      </Highlight>
    </div>
    <div className="col">
      <Highlight language="javascript">
        {`class BNer extends Persoon {
    constructor(voornaam, achternaam, beroep) {
        super(voornaam, achternaam);
        this.beroep = beroep;
    }

    krijgVolledigeNaam() {
        return super.krijgVolledigeNaam() + ' (' + this.beroep + ')';
    }
}

var bner = new BNer("Gigi", "Ravelli", "Actrice");
console.log(bner.krijgVolledigeNaam());
`}
      </Highlight>
    </div>
    <div className="col">
      <Highlight language="javascript">
        {`class Persoon {
    constructor(voornaam, achternaam) {
        this.voornaam = voornaam;
        this.achternaam = achternaam;
        if(!Persoon.personen) {
            Persoon.personen = [];
        }
        Persoon.personen.push(this);
    }

    get volledigeNaam() {
        return this.voornaam + ' ' + this.achternaam;
    }

    static allePersonen() {
        const personen = Persoon.personen.map((persoon) => {
            return persoon.volledigeNaam;
        });
        return personen.join(', ');
    }
}

var gary = new Persoon('Gary', 'Kertopermono');
var thomas = new Persoon('Thomas', 'Jüsche');
console.log(Persoon.allePersonen());`}
      </Highlight>
    </div>

  </div>
)

export default Classes;
