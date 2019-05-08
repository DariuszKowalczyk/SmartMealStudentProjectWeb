import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import Home from './home';
import Navbar from './components/navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route component={Home} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
