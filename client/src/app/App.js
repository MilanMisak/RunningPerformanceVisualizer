import React, {Fragment} from 'react';
import Hero from './Hero';
import Footer from './Footer';
import SearchForm from './SearchForm';
import AthleteDetail from '../athlete-detail/AthleteDetail';
import './App.scss';

export default ({athleteData, onSearch}) => <Fragment>
    <Hero>
        <SearchForm onSearch={onSearch} />
    </Hero>
    <main className="container">
        <AthleteDetail data={athleteData} />
    </main>
    <Footer />
</Fragment>;
