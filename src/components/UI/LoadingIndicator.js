import React from "react";
import classes from "./LoadingIndicator.module.css";

const LoadingIndicator = () => (
	<div className={classes.Lds_ring}>
		<div />
		<div />
		<div />
		<div />
	</div>
);

export default LoadingIndicator;
