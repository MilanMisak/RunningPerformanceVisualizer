import React from 'react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import './EventPerformanceHistory.scss';

const formatDate = timestamp => format(parse(timestamp), 'YYYY-MM-DD')

const formatTime = seconds => {
	// Assume that performances of the same event will share
	// scale so from each tick we can figure out format
	const date = parse(seconds * 1000);
	if (seconds < 10 * 60) {  // < 10 mins
		return format(date, 'm:ss.SS');
	} else if (seconds < 60 * 60) {  // < 1 hour
		return format(date, 'm:ss');
	} else {
		return format(date, 'h:mm:ss');
	}
};

export default ({performances, selectedEvent}) => {
	const data = performances[selectedEvent]
		.sort((p1, p2) => p1.date.localeCompare(p2.date))
		.map(p => ({
			timestamp: parse(p.date).getTime(),
			[selectedEvent]: p.time
		}));

	return <div className="section event-performance-history">
		<h4 className="title is-4">Event Performance History: {selectedEvent}</h4>

		<div className="chart-wrapper">
			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={data}>
					<XAxis
						type="number"
						dataKey="timestamp"
						domain={['auto', 'auto']}
						tickFormatter={formatDate} />

					<YAxis
						domain={['auto', 'auto']}
						tickFormatter={formatTime} />

					<CartesianGrid stroke="#e5e5e5" />

					<Line
						dataKey={selectedEvent}
						strokeWidth={0}
						dot={{stroke: '#996300', strokeWidth: 2}}
						isAnimationActive={false} />

					<Tooltip
						labelFormatter={formatDate}
						formatter={formatTime} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	</div>;
};
