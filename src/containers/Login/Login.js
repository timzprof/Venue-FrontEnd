import React, {Component, Fragment} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/UI/Card";
import Form from "../../components/Form/Form";
import {updateObject, checkValidity} from "../../helpers/utility";
import classes from "./Login.module.css";

class Login extends Component {
	state = {
		controls: {
			email: {
				formAttributes: {
					type: "email",
					name: "email",
					value: ""
				},
				rules: {
					isEmail: true,
					required: true
				}
			},
			password: {
				formAttributes: {
					type: "password",
					name: "password",
					value: ""
				},
				rules: {
					required: true,
					minLength: 7
				}
			}
		},
		formIsValid: false
	};
	inputChangeHandler = (e, control) => {
		const updatedControls = updateObject(this.state.controls, {
			[control]: updateObject(this.state.controls[control], {
				formAttributes: updateObject(
					this.state.controls[control].formAttributes,
					{
						value: e.target.value
					}
				)
			})
		});
		const formIsValid = checkValidity(
			e.target.value,
			this.state.controls[control].rules
		);

		this.setState({controls: updatedControls, formIsValid});
	};
	submitLogin = () => {};
	render() {
		return (
			<Fragment>
				<Header />
				<section className={classes.Form__container}>
					<Card extraClasses={[classes.Form]}>
						<h3>Login</h3>
						<Form
							controls={this.state.controls}
							inputChangeHandler={this.inputChangeHandler}
							handleSubmit={this.submitLogin}
							submitButton="Login"
						/>
					</Card>
				</section>

				<Footer />
			</Fragment>
		);
	}
}

export default Login;
