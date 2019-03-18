import React, {Fragment} from 'react';
import Profile from './Profile';
import EventBreakdown from './EventBreakdown';

export default React.memo(({data}) => {
	return <Fragment>
		<div className="level" style={{marginBottom: 35}}>
			<div className="level-left">
				<Profile profile={data.profile} />
			</div>
		</div>
		<EventBreakdown performances={data.performances} />
	</Fragment>;
});
