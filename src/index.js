import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/index.css';
import App from './containers/App';
import LandingPage from './routes/LandingPage';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
          <Route path="/Home" component={App}/>
          <Route path="/" component={LandingPage} />
    </div>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
