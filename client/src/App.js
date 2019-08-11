import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './css/style.css';

import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Error from './components/Error'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/logout" component={Login}/>
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;