import React, {Fragment, Suspense} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Hero from './Hero';
import Footer from './Footer';
import SearchForm from './SearchForm';
import Loader from '../common/Loader';
import './App.scss';

const AthleteDetail = React.lazy(() => import(/* webpackChunkName: "athlete-detail" */ '../athlete-detail/AthleteDetail'));

function App({athleteData, onSearch}) {
    return <Fragment>
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
}
App.propTypes = {
    athleteData: PropTypes.object,
    onSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    athleteData: state.athleteData
});

const mapDispatchToProps = dispatch => ({
    onSearch: athleteId => dispatch({type: 'LOAD_ATHLETE', athleteId})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
