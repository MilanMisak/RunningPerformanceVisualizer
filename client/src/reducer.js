export default (state = {
	athleteData: null
}, action) => {
	switch (action.type) {
	case 'ATHLETE_DATA_LOADED':
		return {...state, athleteData: action.athleteData};
	default:
		return state;
	}
};
