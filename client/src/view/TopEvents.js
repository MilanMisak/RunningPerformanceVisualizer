import React from 'react';
import ReactChartkick, {LineChart, PieChart} from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const SIZE = 250;

export default ({performances}) => {
	const sortedEvents = Object.keys(performances)
			.sort((ev1, ev2) => performances[ev1].length - performances[ev2].length)
			.reverse(),
		others = sortedEvents
			.slice(5)
			.reduce((memo, ev) => memo + performances[ev].length, 0),
		data = sortedEvents
			.slice(0, 5)
			.map(ev => [ev, performances[ev].length]);
	data.push(['Others', others]);

	return <div>
		<PieChart data={data} legend="bottom" width={SIZE} height={SIZE} />
	</div>;
};
