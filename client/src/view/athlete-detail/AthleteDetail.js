import React, {Fragment, useState} from 'react';
import {sortEventsByPopularity} from '../../utils';
import ProfileCard from './ProfileCard';
import {TopCountries, TopEvents} from './TopCharts';
import EventBreakdownSection from './EventBreakdownSection';
import EventPerformanceHistorySection from './EventPerformanceHistorySection';

const getDefaultEvent = performances => {
	const sortedEvents = sortEventsByPopularity(performances);
	return sortedEvents ? sortedEvents[0] : null;
}

export default React.memo(({data}) => {
	let [selectedEvent, setSelectedEvent] = useState(getDefaultEvent(data.performances));
	if (!(selectedEvent in data.performances)) {
		// Reset selected event if the current one is not available
		// (for example when a new athlete data is loaded)
		selectedEvent = getDefaultEvent(data.performances);
	}

	return <Fragment>
		<div className="section level">
			<div className="level-left">
				<div className="level-item">
					<ProfileCard profile={data.profile} />
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

		<EventBreakdownSection
			performances={data.performances}
			selectedEvent={selectedEvent}
			setSelectedEvent={setSelectedEvent} />

		{selectedEvent
			? <EventPerformanceHistorySection
				performances={data.performances}
				selectedEvent={selectedEvent} />
			: null}
	</Fragment>;
});
