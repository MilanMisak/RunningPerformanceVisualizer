import React, {Fragment} from 'react';
import Profile from './Profile';
import TopEvents from './TopEvents';
import TopCountries from './TopCountries';
import EventBreakdown from './EventBreakdown';

export default React.memo(({data}) => {
	return <Fragment>
		<div className="level" style={{marginBottom: 35}}>
			<div className="level-left">
				<div className="level-item">
					<Profile profile={data.profile} />
				</div>
				<div className="level-item">
					<TopEvents performances={data.performances} />
				</div>
				<div className="level-item">
					<TopCountries performances={data.performances} />
				</div>
			</div>
		</div>
		<EventBreakdown performances={data.performances} />
	</Fragment>;
});
