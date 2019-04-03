import React from 'react';
import PropTypes from 'prop-types';
import ProfileCard from './ProfileCard';
import {TopCountries, TopEvents, TopYears} from './TopCharts';
import './OverviewSection.scss';

export default function OverviewSection({profile, performances}) {
    return <div className="overview-section section level">
        <div className="level-left">
            <div className="level-item">
                <ProfileCard profile={profile} />
            </div>
            <div className="level-item is-vertical">
                <h4 className="title is-4">Top Events</h4>
                <TopEvents performances={performances} />
            </div>
            <div className="level-item is-vertical">
                <h4 className="title is-4">Top Countries</h4>
                <TopCountries performances={performances} />
            </div>
            <div className="level-item is-vertical">
                <h4 className="title is-4">Top Years</h4>
                <TopYears performances={performances} />
            </div>
        </div>
    </div>;
}
OverviewSection.propTypes = {
    profile: PropTypes.object.isRequired,
    performances: PropTypes.array.isRequired
};
