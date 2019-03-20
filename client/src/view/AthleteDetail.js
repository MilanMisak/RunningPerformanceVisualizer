import React, {Fragment, useState} from 'react';
import {sortEventsByPopularity} from '../utils';
import Profile from './Profile';
import TopEvents from './TopEvents';
import TopCountries from './TopCountries';
import EventBreakdown from './EventBreakdown';
import EventPerformanceHistory from './EventPerformanceHistory';

const getDefaultEvent = performances => {
	const sortedEvents = sortEventsByPopularity(performances);
	return sortedEvents ? sortedEvents[0] : null;
}

export default React.memo(({data}) => {
	let [selectedEvent, setSelectedEvent] = useState(getDefaultEvent(data.performances));
	if (!(selectedEvent in data.performances)) {
		selectedEvent = getDefaultEvent(data.performances);
	}

	return <Fragment>
		<div className="section level">
			<div className="level-left">
				<div className="level-item">
					<Profile profile={data.profile} />
				</div>
				<div className="level-item is-vertical">
					<h4 className="title is-4">Top Events</h4>
					<TopEvents performances={data.performances} />
				</div>
				<div className="level-item is-vertical">
					<h4 className="title is-4">Top Countries</h4>
					<TopCountries performances={data.performances} />
				</div>
			</div>
		</div>

		<EventBreakdown
			performances={data.performances}
			selectedEvent={selectedEvent}
			setSelectedEvent={setSelectedEvent} />

		{selectedEvent
			? <EventPerformanceHistory
				performances={data.performances}
				selectedEvent={selectedEvent} />
			: null}
	</Fragment>;
});
