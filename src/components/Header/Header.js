import React from "react";
import { Link } from 'react-router-dom';
import classes from "./Header.module.css";

const Header = React.memo(props => {
	return (
		<header className={classes.Header}>
			<div className={classes.Logo}>VApp</div>
			<Link className={classes.Link} to="/login">Log In</Link>
		</header>
	);
});

export default Header;
