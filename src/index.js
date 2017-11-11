import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/index.css';
import App from './routes/App';
import LandingPage from './routes/LandingPage';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/Home" component={App}/>
          <Route path="/" component={LandingPage} />
        </Switch>
    </div>
    </Router>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
