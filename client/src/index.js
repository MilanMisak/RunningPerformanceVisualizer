import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import {getAthletePerformances} from './api';

(async () => {
	const performances = await getAthletePerformances(482);
	ReactDOM.render(<App performances={performances} />, document.getElementById('root'));
})();
