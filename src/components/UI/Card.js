import React from "react";
import classes from "./Card.module.css";

const Card = props => {
	const classNames = [classes.Card];
	if (props.extraClasses) {
		props.extraClasses.forEach(cl => {
			classNames.push(cl);
		});
	}
	return <div className={classNames.join(" ")}>{props.children}</div>;
};

export default Card;
