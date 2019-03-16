import React, {Fragment} from 'react';
import AthleteDetail from './AthleteDetail';
import './App.scss';

const Header = () => <section class="hero is-dark">
	<div class="hero-body">
		<div class="container">
			<h1 class="title">
				Running Performance Visualizer
			</h1>
			<h2 class="subtitle">
				Using Power of 10 data
			</h2>
		</div>
	</div>
</section>;

const Footer = () => <footer class="footer">
	<div class="content has-text-centered">
		<p>
		<strong>Running Performance Visualizer</strong> by Milan Misak
		</p>
	</div>
</footer>

export default ({performances}) => <Fragment>
	<Header />
	<AthleteDetail performances={performances} />
	<Footer />
</Fragment>;
