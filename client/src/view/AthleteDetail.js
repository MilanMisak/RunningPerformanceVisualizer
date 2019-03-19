import React, {Fragment, useState} from 'react';
import {compareDistance} from '../utils';
import Profile from './Profile';
import TopEvents from './TopEvents';
import TopCountries from './TopCountries';
import EventBreakdown from './EventBreakdown';
import EventPerformanceHistory from './EventPerformanceHistory';

export default React.memo(({data}) => {
	const sortedEvents = Object.keys(data.performances).sort(compareDistance),
		[selectedEvent, setSelectedEvent] = useState(sortedEvents ? sortedEvents[0] : null);

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

		<EventPerformanceHistory
			performances={data.performances}
			selectedEvent={selectedEvent} />
	</Fragment>;
});
