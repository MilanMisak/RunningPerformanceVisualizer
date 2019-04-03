import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {INITIAL_ATHLETE_ID} from '../utils';

export default function SearchForm({onSearch}) {
    const [athleteIdStr, setAthleteIdStr] = useState(INITIAL_ATHLETE_ID + '');
    return <form onSubmit={e => {
        e.preventDefault();
        onSearch(athleteIdStr);
    }}>
        <div className="field has-addons">
            <div className="control">
                <input
                    className="input"
                    type="text"
                    placeholder="Enter Power of 10 athlete ID"
                    value={athleteIdStr}
                    onChange={e => setAthleteIdStr(e.target.value)} />
            </div>
            <fieldset disabled={athleteIdStr.trim().length === 0}>
                <div className="control">
                    <input className="button is-info" type="submit" value="Search" />
                </div>
            </fieldset>
        </div>
    </form>;
}
SearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired
};
