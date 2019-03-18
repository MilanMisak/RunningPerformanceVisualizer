import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import {getAthleteData} from './api';

(async () => {
	const athleteData = await getAthleteData(482);
	ReactDOM.render(<App athleteData={athleteData} />, document.getElementById('root'));
})();
