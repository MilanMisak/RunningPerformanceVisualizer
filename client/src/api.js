export const getAthletePerformances = async id => {
	const response = await fetch(`http://127.0.0.1:5000/athlete/${id}`, {mode: 'cors'});
	const data = await response.json();
	console.log(data);
	return data;
};
