import babelPolyfill from 'babel/polyfill';
import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import Index from './components/Index';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import libraryApp from './reducers';
import LocalStorageManager from './lib/LocalStorageManager';

// Create redux store
const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);
let store = createStoreWithMiddleware(libraryApp);

// load cart if it's present in localStorage !!!
LocalStorageManager.loadCartIfPresent(store);

ReactDOM.render(<Provider store={store}>
  <Router>
    <Route path='/' component={Layout}>
      <IndexRoute component={Index}/>
      <Route path='catalog' component={Catalog}/>
      <Route path='cart' component={Cart} />
    </Route>
  </Router>
</Provider>, document.getElementById('app'));
