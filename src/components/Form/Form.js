import React from "react";
import classes from "./Form.module.css";

const form = props => {
	const {controls, submitButton, inputChangeHandler, handleFormSubmit} = props;
	return (
		<form onSubmit={handleFormSubmit}>
			{Object.keys(controls).map(formEl => {
				return (
					<div key={formEl} className={classes.Form_group}>
                        <input
                            className={classes.Form_field}
							{...controls[formEl].formAttributes}
							onChange={(e) => inputChangeHandler(e,controls[formEl].formAttributes.name)}
							required
						/>
					</div>
				);
			})}
			<button type="submit" className="btn">{submitButton}</button>
		</form>
	);
};

export default form;
