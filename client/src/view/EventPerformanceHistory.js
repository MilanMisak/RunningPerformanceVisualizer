import React from 'react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

export default ({performances, selectedEvent}) => {
	const data = performances[selectedEvent].sort((p1, p2) => p1.date.localeCompare(p2.date)).map(p => {
		return {
			timestamp: parse(p.date).getTime(),
			[selectedEvent]: p.time
		};
	});

	return <div className="section">
		<h4 className="title is-4">Event Performance History: {selectedEvent}</h4>

		<ResponsiveContainer width="100%" height={400}>
			<LineChart data={data}>
				<XAxis
					type="number"
					dataKey="timestamp"
					domain={['auto', 'auto']}
					tickFormatter={timestamp => format(parse(timestamp), 'YYYY-MM-DD')} />
				<YAxis domain={['auto', 'auto']}/>
				<Line dataKey={selectedEvent} />
				<Tooltip />
			</LineChart>
		</ResponsiveContainer>
	</div>;
};
