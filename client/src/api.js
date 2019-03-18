import {SERVER_URL} from 'config';

export const getAthleteData = async id => {
	const response = await fetch(`${SERVER_URL}/api/athlete/${id}`, {mode: 'cors'});
	return await response.json();
};
