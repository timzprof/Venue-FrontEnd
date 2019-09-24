import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import VenueDetails from "./containers/VenueDetails/VenueDetails";

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/venue-details" component={VenueDetails} />
			</Switch>
		);
	}
}

export default App;
