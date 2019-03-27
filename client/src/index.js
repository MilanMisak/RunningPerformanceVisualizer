import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from './sagas';
import App from './app/App';
import {INITIAL_ATHLETE_ID} from './utils';

const sagaMiddleware = createSagaMiddleware(),
	store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

store.dispatch({type: 'LOAD_ATHLETE_DATA', id: INITIAL_ATHLETE_ID});
