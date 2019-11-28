import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/home/home'
import Login from './Pages/login/login'
import ViewVenue from './Pages/viewVenue/viewVenue';
import DatePicker from './Pages/DatePicker/DatePicker';
import NewBookings from './Pages/newBookings/newBookings';
import ViewBookings from './Pages/viewBookings/viewBookings';
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes';
import Logout from './components/logout/logout';
import NotFound from './Pages/notFound/notFound';
import GuardRoutes from './components/guardRoutes/guardRoutes';


class App extends Component {
  render(){
    return (
        <Switch>
          <Route exact path={["/", '/venue/']} component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/venue/:id" component={ViewVenue} />
          <Route path="/date-picker" component={DatePicker} />
          <Route path="/logout" component={Logout} />
          <Route path="/page-not-found" component={NotFound} />
          <ProtectedRoutes path="/new-bookings" component={NewBookings} />
          <ProtectedRoutes path="/bookings/:venueid/:date" component={ViewBookings} />  
          {/* guard the above route */}
        </Switch>
    );
  }
}

export default App;
