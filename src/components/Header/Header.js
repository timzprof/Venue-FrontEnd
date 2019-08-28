import React from "react";
import classes from "./Header.module.css";

const Header = React.memo(props => {
	return (
		<header className={classes.Header}>
			<div className={classes.Logo}>VApp</div>
			<a className={classes.Link} href="/">Log In</a>
		</header>
	);
});

export default Header;
