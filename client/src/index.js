import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import {getAthleteData} from './api';

(async function render(athleteIdStr) {
	const athleteData = await getAthleteData(athleteIdStr);
	ReactDOM.render(<App
		athleteData={athleteData}
		onSearch={render} />, document.getElementById('root'));
})(482);
