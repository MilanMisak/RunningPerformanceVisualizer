import React, {Fragment, Suspense} from 'react';
import {connect} from 'react-redux';
import Hero from './Hero';
import Footer from './Footer';
import SearchForm from './SearchForm';
import './App.scss';

const Loader = () => 'Loading\u2026';

const AthleteDetail = React.lazy(() => import(/* webpackChunkName: "athlete-detail" */ '../athlete-detail/AthleteDetail'));

const App = ({athleteData, onSearch}) => <Fragment>
    <Hero>
        <SearchForm onSearch={onSearch} />
    </Hero>
    <main className="container">
		<Suspense fallback={<Loader />}>
			{athleteData
				? <AthleteDetail data={athleteData} />
				: <Loader />}
		</Suspense>
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
