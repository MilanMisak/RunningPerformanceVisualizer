import React from 'react';
import parse from 'date-fns/parse';
import getYear from 'date-fns/get_year';
import {compareDistance} from '../utils';
import './EventBreakdown.scss';

const renderPerformanceTime = performance => performance && performance.time_str;

/*
 * Returns a function which given a performance (optional) returns a background
 * colour for a heatmap that will compare the time of the performance to the
 * given best and worst time.
 */
const createHeatmapGenerator = (bestTime, worstTime) => {
	return performance => {
		if (!performance) {
			return {
				backgroundColor: 'hsl(34, 0%, 95%)'
			};
		}
		const frac = worstTime === bestTime ? 0 : (performance.time - bestTime) / (worstTime - bestTime);
		return {
			backgroundColor: `hsl(34, ${(1 - frac) * 50 + 50}%, ${frac * 40 + 50}%)`,
			color: '#363636',
			fontWeight: performance.time === bestTime ? 'bold' : null
		};
	};
};

export default ({performances, selectedEvent, setSelectedEvent}) => {
	// Find the earliest and latest year with any performances
	let minYear = Number.MAX_VALUE,
		maxYear = Number.MIN_VALUE,
		bestByEventAndYear = {},
		bestByEvent = {},
		worstByEvent = {},
		lastByEvent = {};
	Object.keys(performances).forEach(ev => {
		performances[ev].forEach(performance => {
			const year = getYear(parse(performance.date));
			minYear = Math.min(minYear, year);
			maxYear = Math.max(maxYear, year);

			// Find best by event and year
			if (!(ev in bestByEventAndYear)) {
				bestByEventAndYear[ev] = {};
			}
			if (!(year in bestByEventAndYear[ev])
					|| performance.time < bestByEventAndYear[ev][year].time) {
				bestByEventAndYear[ev][year] = performance;
			}

			// Find best by event
			if (!(ev in bestByEvent)
					|| performance.time < bestByEvent[ev].time) {
				bestByEvent[ev] = performance;
			}

			// Find worst by event
			if (!(ev in worstByEvent)
					|| performance.time > worstByEvent[ev].time) {
				worstByEvent[ev] = performance;
			}

			// Find last, YYYY-MM-DD can be compared with >
			if (!(ev in lastByEvent)
					|| performance.date > lastByEvent[ev].date) {
				lastByEvent[ev] = performance;
			}
		})
	});

	// Get an array of years in the range in descending order
	const years = [...Array(maxYear - minYear + 1).keys()].map(year => maxYear - year);

	// Get a sorted list of events by distance
	const events = Object.keys(performances).sort(compareDistance);

	return <div className="event-breakdown">
		<h4 className="title is-4">Event Breakdown by Year</h4>
		<h6 className="subtitle is-6">Click on an event name to plot times</h6>

		<div className="tables">
			<div>
				<table className="table is-bordered">
					<thead>
						<tr>
							<th className="header">Event</th>
							<th>Best</th>
						</tr>
					</thead>
					<tbody>
						{events.map(ev => {
							const isSelected = ev === selectedEvent;
							return <tr key={ev}>
								<td
									className={`header clickable${isSelected ? ' selected' : ''}`}
									onClick={isSelected ? null : () => setSelectedEvent(ev)}>{ev}</td>
								<td className="header-light">{renderPerformanceTime(bestByEvent[ev])}</td>
							</tr>;
						})}
					</tbody>
				</table>
			</div>

			<div>
				<table className="table is-bordered">
					<thead>
						<tr>
							<th className="header-light">Last</th>
							{years.map(year => <th key={year}>{year}</th>)}
						</tr>
					</thead>
					<tbody>
						{events.map(ev => {
							const getHeatmapStyle = createHeatmapGenerator(bestByEvent[ev].time, worstByEvent[ev].time);
							return <tr key={ev}>
								<td className="header-light">{renderPerformanceTime(lastByEvent[ev])}</td>
								{years.map(year => {
									const performance = bestByEventAndYear[ev] && bestByEventAndYear[ev][year];
									return <td key={year} style={getHeatmapStyle(performance)}>
										{renderPerformanceTime(performance)}
									</td>;
								})}
							</tr>;
						})}
					</tbody>
				</table>
			</div>
		</div>
	</div>;
};
