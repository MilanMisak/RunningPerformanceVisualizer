import React from 'react';
import PropTypes from 'prop-types';
import ReactChartkick, {PieChart} from 'react-chartkick';
import Chart from 'chart.js';
import getYear from 'date-fns/get_year';
import parse from 'date-fns/parse';
import {sortEventsByPopularity} from '../utils';

ReactChartkick.addAdapter(Chart);

const SIZE = 250;
function DonutChart({data}) {
    return <PieChart data={data} legend="bottom" width={SIZE} height={SIZE} donut={true} />;
}
DonutChart.propTypes = {
    data: PropTypes.array.isRequired
};

const TOP_N = 5;
const getDonutChartData = (valueByKey, sortedKeys) => {
    const others = sortedKeys
            .slice(TOP_N)
            .reduce((memo, key) => memo + valueByKey[key], 0),
        data = sortedKeys
            .slice(0, TOP_N)
            .map(key => [key, valueByKey[key]]);
    data.push(['Others', others]);
    return data;
};

export function TopEvents({performances}) {
    const performanceCountByEvent = Object.keys(performances)
            .reduce((memo, ev) => {
                memo[ev] = performances[ev].length;
                return memo;
            }, {}),
        sortedEvents = sortEventsByPopularity(performances);

    return <div>
        <DonutChart data={getDonutChartData(performanceCountByEvent, sortedEvents)} />
    </div>;
}

export function TopCountries({performances}) {
    const performanceCountPerCountry = Object.keys(performances)
            .reduce((memo, ev) => performances[ev].reduce((memo, {country}) => {
                if (country in memo) {
                    memo[country]++;
                } else {
                    memo[country] = 1;
                }
                return memo;
            }, memo), {}),
        sortedCountries = Object.keys(performanceCountPerCountry)
            .sort((c1, c2) => performanceCountPerCountry[c2] - performanceCountPerCountry[c1]);

    return <div>
        <DonutChart data={getDonutChartData(performanceCountPerCountry, sortedCountries)} />
    </div>;
}

export function TopYears({performances}) {
    const performanceCountPerYear = Object.keys(performances)
            .reduce((memo, ev) => performances[ev].reduce((memo, {date}) => {
                const year = getYear(parse(date));
                if (year in memo) {
                    memo[year]++;
                } else {
                    memo[year] = 1;
                }
                return memo;
            }, memo), {}),
        sortedYears = Object.keys(performanceCountPerYear)
            .sort((c1, c2) => performanceCountPerYear[c2] - performanceCountPerYear[c1]);

    return <div>
        <DonutChart data={getDonutChartData(performanceCountPerYear, sortedYears)} />
    </div>;
}

TopEvents.propTypes = TopCountries.propTypes = TopYears.propTypes = {
    performances: PropTypes.object.isRequired
};
