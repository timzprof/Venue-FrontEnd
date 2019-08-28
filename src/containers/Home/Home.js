import React, {Fragment, PureComponent} from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import VenueCard from "../../components/VenueCard/VenueCard";

class Home extends PureComponent {
	state = {
		venues: [
			{
				id: 1,
				title: "Conference Hall",
				location: "CITS,Unilag",
				noOfSeats: 200,
				extras: [
					{
						type: "Internet",
						available: false
					},
					{
						type: "Computers",
						available: true
					}
				]
			},
			{
				id: 2,
				title: "Conference Hall",
				location: "CITS,Unilag",
				noOfSeats: 200,
				extras: [
					{
						type: "Internet",
						available: false
					},
					{
						type: "Computers",
						available: true
					}
				]
			},
			{
				id: 3,
				title: "Conference Hall",
				location: "CITS,Unilag",
				noOfSeats: 200,
				extras: [
					{
						type: "Internet",
						available: false
					},
					{
						type: "Computers",
						available: true
					}
				]
			},
			{
				id: 4,
				title: "Conference Hall",
				location: "CITS,Unilag",
				noOfSeats: 200,
				extras: [
					{
						type: "Internet",
						available: false
					},
					{
						type: "Computers",
						available: true
					}
				]
			},
			{
				id: 5,
				title: "Conference Hall",
				location: "CITS,Unilag",
				noOfSeats: 200,
				extras: [
					{
						type: "Internet",
						available: false
					},
					{
						type: "Computers",
						available: true
					}
				]
			},
			{
				id: 6,
				title: "Conference Hall",
				location: "CITS,Unilag",
				noOfSeats: 200,
				extras: [
					{
						type: "Internet",
						available: false
					},
					{
						type: "Computers",
						available: true
					}
				]
			}
		]
	};
	render() {
		return (
			<Fragment>
				<Header />
				<main className="main">
					<section className="card_container">
						{this.state.venues.map(venue => {
							return <VenueCard key={venue.id} {...venue} />;
						})}
					</section>
				</main>
				<Footer />
			</Fragment>
		);
	}
}

export default Home;
