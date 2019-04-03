import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {sortEventsByPopularity} from '../utils';
import OverviewSection from './OverviewSection';
import EventBreakdownSection from './EventBreakdownSection';
import EventPerformanceHistorySection from './EventPerformanceHistorySection';

const getDefaultEvent = performances => {
    const sortedEvents = sortEventsByPopularity(performances);
    return sortedEvents ? sortedEvents[0] : null;
};

function AthleteDetail({data}) {
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
}
AthleteDetail.propTypes = {
    data: PropTypes.object.isRequired
};

export default React.memo(AthleteDetail);
