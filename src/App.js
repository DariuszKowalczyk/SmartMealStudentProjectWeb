import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import AuthHeader from './helpers/AuthHeader';
import { store } from './store/Store';
import { PrivateRoute, NotAuthorizeRoute } from './helpers/RouteHelper';
import Login from './containers/login/LoginContainer';
import Home from './containers/home/HomeContainer';
import Navbar from './components/navbar';

const cookies = new Cookies();

class App extends Component {
  render() {
    AuthHeader(cookies.get('jwt'));
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <NotAuthorizeRoute component={Login} path="/login" />
            <PrivateRoute component={Home} path="" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
