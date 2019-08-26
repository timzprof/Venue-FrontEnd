import React from "react";
import Card from '../UI/Card';
import classes from "./VenueCard.module.css";
import image from "../../assets/images/img.png";

const VenueCard = React.memo(props => {
	return (
		<Card extraClasses={[classes.Card]}>
			<div className={classes.Card_img}>
				<img src={image} alt="Venue" />
			</div>
			<h3>{props.title}</h3>
			<p>{props.location}</p>
			<p>{props.noOfSeats} Seats</p>
			<button className={["btn", classes.Card_button].join(" ")}>View</button>
		</Card>
	);
});

export default VenueCard;
