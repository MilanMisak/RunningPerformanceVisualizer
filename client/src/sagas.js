import {call, cancelled, put, takeLatest} from 'redux-saga/effects';
import {getAthleteData} from './api';

function* loadAthleteData(action) {
	try {
		const athleteData = yield call(getAthleteData, action.id);
		yield put({type: 'ATHLETE_DATA_LOADED', athleteData});
	} catch (e) {
		if (yield cancelled()) {
			// TODO - handle cancellation
		} else {
			// TODO - handle error
		}
	}
}

function* rootSaga() {
	yield takeLatest('LOAD_ATHLETE_DATA', loadAthleteData);
}

export default rootSaga;
