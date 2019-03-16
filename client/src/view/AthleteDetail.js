import React, {Fragment} from 'react';
import EventBreakdown from './EventBreakdown';

export default React.memo(({performances}) => {
	return <Fragment>
		<EventBreakdown performances={performances} />
	</Fragment>;
});
