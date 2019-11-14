import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/home/home'
import Login from './Pages/login/login'
import ViewVenue from './Pages/viewVenue/viewVenue';

class App extends Component {
  render(){
    return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/venue/:id" component={ViewVenue} />
        </Switch>
    );
  }
}

export default App;
