import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/home/home'
import Login from './Pages/login/login'
import ViewVenue from './Pages/viewVenue/viewVenue';
import DatePicker from './Pages/DatePicker/DatePicker';
import NewBookings from './Pages/newBookings/newBookings';
import ViewBookings from './Pages/viewBookings/viewBookings';
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes';


class App extends Component {
  render(){
    return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/venue/:id" component={ViewVenue} />
          <Route path="/date-picker" component={DatePicker} />
          <ProtectedRoutes path="/new-bookings" component={NewBookings} />
          <ProtectedRoutes path="/bookings" component={ViewBookings} />
        </Switch>
    );
  }
}

export default App;
