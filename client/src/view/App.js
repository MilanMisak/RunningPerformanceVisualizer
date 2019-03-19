import React, {Fragment, useState} from 'react';
import AthleteDetail from './AthleteDetail';
import './App.scss';

const SearchForm = ({onSearch}) => {
    const [athleteIdStr, setAthleteIdStr] = useState('');
    return <form onSubmit={e => {
        e.preventDefault();
        onSearch(athleteIdStr);
    }}>
        <div className="field has-addons">
            <div className="control">
                <input
                    className="input"
                    type="text"
                    placeholder="Enter athlete ID"
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
};

const Hero = ({children}) => <section className="hero is-primary is-bold">
    <div className="hero-body">
        <div className="container">
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h1 className="title">
                            Running Performance Visualizer
                        </h1>
						<span className="tag is-warning" style={{marginLeft: 10}}>BETA</span>
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>;

const Footer = () => <footer className="footer">
    <div className="content has-text-centered">
        <p>
			<strong>Running Performance Visualizer</strong> by Milan Misak, <a href="https://github.com/MilanMisak/RunningPerformanceVisualizer">GitHub</a>
        </p>
    </div>
</footer>

export default ({athleteData, onSearch}) => <Fragment>
    <Hero>
        <SearchForm onSearch={onSearch} />
    </Hero>
    <main className="container">
        <AthleteDetail data={athleteData} />
    </main>
    <Footer />
</Fragment>;
