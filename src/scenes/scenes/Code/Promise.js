import React from 'react'
import Highlight from 'react-highlight'

const Promise = () => (
  <div id="page_code" className="container">
    <div className="col">
      <Highlight language="javascript">
        {`for(let index = 0; index < 10; index++) {
    console.log(index);
}
console.log('Dit is synchroon');
  `}
      </Highlight>
    </div>
    <div className="col">
      <Highlight language="javascript">
        {`setTimeout(() => {
    for(let index = 0; index < 10; index++) {
        console.log(index);
    }
}, 1000);
console.log('Dit is asynchroon');
`}
      </Highlight>
    </div>
    <div className="col">
      <Highlight language="javascript">
        {`let promise = new Promise(function(resolve, reject) {
    if(confirm('Promise voltooien?')) {
        resolve();
    } else {
        reject();
    }
});

promise.then(() => {
    console.log('Promise voltooid!');
}, () => {
    console.log('Promise gefaald!');
});
`}
      </Highlight>
    </div>

    <div className="col">
      <Highlight language="javascript">
        {`let promise1 = new Promise(function(resolve) {
    const knop = document.getElementById('knop');
    const waarde = document.getElementById('waarde');
    let waardeGetal = 0;
    const klikKnop = () => {
        waarde.textContent = ++waardeGetal;
        if(waardeGetal > 9) {
            knop.removeEventListener('click', klikKnop);
            knop.disabled = true;
            resolve('Tien keer geklikt');
        }
    }
    knop.addEventListener('click', klikKnop);
});

let promise2 = new Promise(function(resolve) {
    const start = (new Date()).getTime();
    const tijd = document.getElementById('tijd');
    const countdown = setInterval(() => {
        const diff = (new Date()).getTime() - start;
        tijd.textContent = Math.max(0, (1000 - Math.round(diff / 10)) / 100);
        if(diff >= 10000) {
            clearInterval(countdown);
            resolve('Tijd voorbij');
        }
    }, 10);
});

Promise.race([promise1, promise2]).then((value) => {
    console.log('Klaar!', value);
});`}
      </Highlight>
    </div>

    <div className="col">
      <Highlight language="javascript">
        {`class Paard {
	/**
	* Create a horse
	* @class
	* @param {string} naam - The horses name
	* @param {number} tickTime - amount of ms that the horse x position changes.
	* @param {number} xtoWin - x value of horse needed to win the race
	*/
	constructor(naam, tickTime, xToWin) {
		this._naam = naam;
		this._tickTime = tickTime;
		this._xToWin = xToWin;
		this._x = 0;
		this._tijd = 0;
		this._plek = 0
	}

	/**
	* Get the placement of the horse after the race.
	*/
	static plek() {
		//create this._plek if this._plek doesn't  yet exsist. for the first itteration of the methdo.
		if(!this._plek) {
			this._plek = 0
		}

		//Every time plek() is called, increase this._plek by 1.
		this._plek++;

		/**
		* Returns the placement of the horse.
		* @returns {number}
		*/
		return this._plek
	}

	/**
	* @async
	* @method start
	* returns a promise that increases the x position on interval.
	* callback resolve when it reaches a certain x position (xToWin).
	* @return {Promise<string>} a string containing the name of the horse and time it took to win.
	*/
	start() {

		return this._promise = new Promise((resolve) => {
			/**
			* assign an interval to this._interval that ticks according to the tickTime from the constructor method.
			*/
			this._interval = setInterval(() => {
				// rand is a random number between 1 and 3.
				let rand = Math.floor(Math.random() * 3) + 1;

				// increase x according to rand.
				this._x += rand;
				// increase total time by the interval time.
				this._tijd += this._tickTime;

				// executed if the x position of the horse is greater or equal to the x position needed to win.
				if(this._x >= this._xToWin) {

					// give the horse a placement when it finished.
					this._plek = Paard.plek();

					resolve(this._plek + '. ' + this._naam + ' wint in: ' + this._tijd + 'ms')

					// if the placement is higher than 1, meaning the horse did not win, log its name + placement + time it took the horse to finish.
					if(this._plek > 1)
						console.log(this._plek + '. ' + this._naam + ' eindigd in: ' + this._tijd + 'ms');

					// clear the interval, since the horse finished.
					clearInterval(this._interval)

				}
			}, this._tickTime)
		})
	}
}

// create an empty array to assign instances of Paard/
const paarden = [];

//make 10 instances of Paard and add them to paarden array
for(let i = 0; i < 10; i++) {
	let paard = new Paard('paard' + (i + 1), 100, 50);
	paarden.push(paard);
}

// map the start method of every horse in the paarden array to races. this will start the race
const races = paarden.map(paard => paard.start());

// race all the horsies and stop the promises when first horsie reaches the x pos
Promise.race(races).then(waarde => {
 	console.log(waarde)
 })`}

      </Highlight>
    </div>

  </div>
)

export default Promise;
