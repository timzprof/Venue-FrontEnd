import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/home/home'
import Login from './Pages/login/login'

class App extends Component {
  render(){
    return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
    );
  }
}

export default App;
