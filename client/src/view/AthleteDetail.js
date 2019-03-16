import React from 'react';
import parse from 'date-fns/parse';
import getYear from 'date-fns/get_year';

const YearByEventTable = ({performances}) => {
	// Find the earliest and latest year with any performances
	let minYear = Number.MAX_VALUE,
		maxYear = Number.MIN_VALUE,
		bestByEventAndYear = {};
	Object.keys(performances).forEach(ev => {
		performances[ev].forEach(performance => {
			const year = getYear(parse(performance.date));
			minYear = Math.min(minYear, year);
			maxYear = Math.max(maxYear, year);

			if (!(ev in bestByEventAndYear)) {
				bestByEventAndYear[ev] = {};
			}
			if (!(year in bestByEventAndYear[ev])
					|| performance.time < bestByEventAndYear[ev][year].time) {
				bestByEventAndYear[ev][year] = performance;
			}
		})
	});

	// Get an array of years in the range in descending order
	const years = [...Array(maxYear - minYear + 1).keys()].map(year => maxYear - year);

	return <table>
		<thead>
			<tr>
				<th>Event</th>
				{years.map(year => <th key={year}>{year}</th>)}
			</tr>
		</thead>
		<tbody>
			{Object.keys(performances).sort().map(ev => <tr key={ev}>
			
				<td>{ev}</td>
				{years.map(year => <td key={year}>{bestByEventAndYear[ev] && bestByEventAndYear[ev][year] && bestByEventAndYear[ev][year].time_str}</td>)}
			</tr>)}
		</tbody>
	</table>;
};

export default React.memo(({performances}) => {
	return <div>
		<YearByEventTable performances={performances} />
	</div>;
});
