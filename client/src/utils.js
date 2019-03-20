export const INITIAL_ATHLETE_ID = 469288;

const METRES_IN_MILE = 1609;

/*
 * Returns an approximate distance in metres for the given event.
 *
 * E.g. eventToMetres('5K') => 5000
 */
const eventToMetres = eventName => {
	eventName = eventName.replace(/(MT|R|NAD|W)$/, '');

	switch (eventName) {
	case 'Mile':
		return METRES_IN_MILE;
	case 'parkrun':
		return 5000;
	case 'HM':
		return 21100;
	case 'Mar':
		return 42200;
	default:
		break;
	}

	// There is probably a number and some units, e.g. 5K
	const match = eventName.match(/^(\d+(\.\d+)?)(.*)/);
	if (match === null) {
		return 0;
	}

	const n = parseInt(match[1], 10),
		unit = match[3];
	switch (unit) {
		case '':  // Just metres
			return n;
		case 'K':
			return n * 1000;
		case 'M':
			return n * METRES_IN_MILE;
		case 'Miles':
			return n * METRES_IN_MILE;
		case 'SC':  // Steeplechase
			return n;
		default:  // Odd case
			console.warn(`Unexpected unit: ${match[2]}`);
			return n;
	}
};

/*
 * A comparator for event names to sort by distance.
 *
 * E.g. compareDistance('1M', '2K') should be < 0.
 */
export const compareDistance = (eventA, eventB) => {
	const metresA = eventToMetres(eventA),
		metresB = eventToMetres(eventB);
	return metresA === metresB
		? eventA.localeCompare(eventB)  // Sort by name if same distance
		: metresA - metresB;
};

/*
 * Sorts events to return the most popular frequent one first.
 */
export const sortEventsByPopularity = performances => Object.keys(performances)
	.sort((ev1, ev2) => performances[ev2].length - performances[ev1].length);
