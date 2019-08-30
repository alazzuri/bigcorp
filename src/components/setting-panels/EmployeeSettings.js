import React, { useContext, useState } from "react";
import { PanelContext } from "../../contexts/SettingsProvider";
import { AppContext } from "../../contexts/AppProvider";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
	root: {
		width: "30%",
		position: "absolute"
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
		display: "block"
	},
	container: {
		display: "block"
	},
	button: {
		margin: theme.spacing(1)
	},
	input: {
		display: "none"
	}
}));

export default function EmployeeSettings() {
	const classes = useStyles();
	// const [expanded, updatePanelState] = useContext(PanelContext);
	const { state, setState } = useContext(AppContext);
	const [values, setValues] = useState({
		employeeId: state.employeeId
	});

	const handleChange = panel => (event, expanded) => {
		setState(expanded ? panel : false);
	};

	const handleValueChange = name => event => {
		const value = event.target.value.replace(/^0+/, "");
		const newvalue = Math.abs(value);

		setValues({ ...values, [name]: newvalue });
	};

	const handleClick = () => {
		const { employeeId } = values;
		setState({ employeeId, employeeSearch: true });
	};

	return (
		<ExpansionPanel
			expanded={state.expanded === "panel3"}
			onChange={handleChange("panel3")}
		>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel3bh-content"
				id="panel3bh-header"
			>
				<Typography className={classes.heading}>Employees</Typography>
				<Typography className={classes.secondaryHeading}>
					Search for an individual employee
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<form className={classes.container} autoComplete="off">
					<TextField
						type="number"
						id="standard-name"
						label="Employee ID"
						className={classes.textField}
						value={parseInt(values.employeeId)}
						onChange={handleValueChange("employeeId")}
						margin="normal"
					/>
					<Button
						color="primary"
						variant="contained"
						className={classes.button}
						onClick={handleClick}
					>
						Search Employee
					</Button>
				</form>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}
