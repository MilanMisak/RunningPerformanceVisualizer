import React from 'react';
import ReactDOM from 'react-dom';
import AthleteDetail from './view/AthleteDetail';
import {getAthletePerformances} from './api';

(async () => {
	const performances = await getAthletePerformances(482);
	ReactDOM.render(<AthleteDetail performances={performances} />, document.getElementById('root'));
})();
