import React from 'react';

const PROFILE_ROWS = [['club', 'Club'], ['gender', 'Gender'], ['age_group', 'Age Group']];

export default ({profile}) => <div className="card">
	<header className="card-header">
		<p className="card-header-title is-centered">{profile.name}</p>
	</header>

	<div className="card-content">
		<table className="table is-fullwidth">
			<thead />
			<tbody>
				{PROFILE_ROWS.map(([id, title]) => <tr key={id}>
					<td>{title}</td>
					<td>{profile[id]}</td>
				</tr>)}
			</tbody>
		</table>
	</div>

	{profile.athlete_id
		? <footer className="card-footer">
			<a
				href={`https://www.thepowerof10.info/athletes/profile.aspx?athleteid=${profile.athlete_id}`}
				className="card-footer-item">View Profile on Power of 10</a>
		</footer>
		: null}
</div>;
