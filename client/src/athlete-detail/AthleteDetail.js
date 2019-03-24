import React, {Fragment, useState} from 'react';
import {sortEventsByPopularity} from '../utils';
import OverviewSection from './OverviewSection';
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
		<OverviewSection {...data} />

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
