import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Home from "../containers/Home/Home";
import {create} from "react-test-renderer";

test("Home Container renders", () => {
	const component = create(
		<Router>
			<Home />
		</Router>
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
