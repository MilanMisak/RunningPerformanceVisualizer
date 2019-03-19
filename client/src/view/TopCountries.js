import React from 'react';
import ReactChartkick, {LineChart, PieChart} from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const SIZE = 250;

export default ({performances}) => {
	const performanceCountPerCountry = Object.keys(performances)
			.reduce((memo, ev) => performances[ev].reduce((memo, {country}) => {
				if (country in memo) {
					memo[country]++;
				} else {
					memo[country] = 1;
				}
				return memo;
			}, memo), {}),
		sortedCountries = Object.keys(performanceCountPerCountry)
			.sort((c1, c2) => performanceCountPerCountry[c2] - performanceCountPerCountry[c1]),
		others = sortedCountries
			.slice(5)
			.reduce((memo, c) => memo + performanceCountPerCountry[c], 0),
		data = sortedCountries
			.slice(0, 5)
			.map(c => [c, performanceCountPerCountry[c]]);
	data.push(['Others', others]);

	return <div>
		<PieChart data={data} legend="bottom" width={SIZE} height={SIZE} donut={true} />
	</div>;
};
