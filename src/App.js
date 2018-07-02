import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Rate from './routes/Rate';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            name='home'
            exact path='/'
            component={Home}
          />
          <Route
            name='rate'
            path='/rate/:userid'
            component={Rate}
          />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
