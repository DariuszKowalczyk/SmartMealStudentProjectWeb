import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import { PersistGate } from 'redux-persist/integration/react';
import AuthHeader from './helpers/AuthHeader';
import { store, persistor } from './store/Store';
import { PrivateRoute, NotAuthorizeRoute } from './helpers/RouteHelper';
import Login from './containers/login/LoginContainer';
import Home from './containers/home/HomeContainer';
import Products from './containers/products/ProductContainer';
import Recipes from './containers/recipe/RecipeContainer';
import RecipeCreate from './containers/recipe/CreateRecipeContainer';
import RecipeDetails from './containers/recipe/RecipeDetailsContainer';
import Navbar from './components/navbar/Navbar';

const cookies = new Cookies();

class App extends Component {
  render() {
    AuthHeader(cookies.get('jwt'));
    console.log(store.store, ' STORE');
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Navbar />
            <Switch>
              <NotAuthorizeRoute component={Login} path="/login" />
              <PrivateRoute component={Home} exact path="/" />
              <PrivateRoute component={Products} path="/products" />
              <PrivateRoute component={Recipes} path="/recipes" />
              <PrivateRoute component={RecipeCreate} path="/CreateRecipe" />
              <PrivateRoute component={RecipeDetails} path="/RecipeDetails/:id" />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
