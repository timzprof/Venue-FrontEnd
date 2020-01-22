import React from "react";
import Login from "../Pages/login/login";
import {BrowserRouter as Router} from "react-router-dom";
import {create} from "react-test-renderer";

test("Login Container renders", () => {
	const component = create(
		<Router>
			<Login />
		</Router>
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
