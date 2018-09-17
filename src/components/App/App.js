import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation';
import * as routes from '../../constants/routes';
import Home from '../Home';
import './style.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <div className="App-Main">
            <Route 
              exact 
              path={routes.HOME}
              component={() => (
                <div>
                  <Home />
                </div>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
