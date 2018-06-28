import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Rate from './Rate';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
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
