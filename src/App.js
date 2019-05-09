import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import AuthHeader from './helpers/AuthHeader';
import { store } from './store/Store';
import Home from './home';
import Navbar from './components/navbar';
import './App.css';

const cookies = new Cookies();
class App extends Component {
  render() {
    AuthHeader(cookies.get('jwt'));
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
