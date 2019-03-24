import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import {getAthleteData} from './api';
import {INITIAL_ATHLETE_ID} from './utils';

// Keep state in a closure
(async function render(athleteIdStr) {
	const athleteData = await getAthleteData(athleteIdStr);
	ReactDOM.render(<App
		athleteData={athleteData}
		onSearch={render} />, document.getElementById('root'));
})(INITIAL_ATHLETE_ID);
