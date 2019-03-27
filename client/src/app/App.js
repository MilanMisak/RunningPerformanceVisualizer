import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Hero from './Hero';
import Footer from './Footer';
import SearchForm from './SearchForm';
import AthleteDetail from '../athlete-detail/AthleteDetail';
import './App.scss';

const App = ({athleteData, onSearch}) => <Fragment>
    <Hero>
        <SearchForm onSearch={onSearch} />
    </Hero>
    <main className="container">
		{athleteData
			? <AthleteDetail data={athleteData} />
			: 'Loading\u2026'}
    </main>
    <Footer />
</Fragment>;

const mapStateToProps = state => ({
	athleteData: state.athleteData
});

const mapDispatchToProps = dispatch => ({
	onSearch: athleteId => dispatch({type: 'LOAD_ATHLETE', athleteId})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
