import React, {Component, Fragment} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import image from '../../assets/images/img.png';
import classes from "./VenueDetails.module.css";

class VenueDetails extends Component {
	render() {
		return (
			<Fragment>
                <Header />
                <section>
                    <button>Back</button>
                    <p>Conference Hall</p>
                    <div>
                        <img src={image} alt="Hall" />
                    </div>
                </section>
				<Footer />
			</Fragment>
		);
	}
}

export default VenueDetails;
