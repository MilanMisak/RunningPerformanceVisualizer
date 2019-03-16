import React, {Fragment} from 'react';
import AthleteDetail from './AthleteDetail';
import './App.scss';

const Header = () => <section className="hero is-primary">
	<div className="hero-body">
		<div className="container">
			<h1 className="title">
				Running Performance Visualizer
			</h1>
			<h2 className="subtitle">
				Using Power of 10 data
			</h2>
		</div>
	</div>
</section>;

const Footer = () => <footer className="footer">
	<div className="content has-text-centered">
		<p>
		<strong>Running Performance Visualizer</strong> by Milan Misak
		</p>
	</div>
</footer>

export default ({performances}) => <Fragment>
	<Header />
	<main className="container">
		<AthleteDetail performances={performances} />
	</main>
	<Footer />
</Fragment>;
