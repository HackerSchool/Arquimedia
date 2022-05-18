import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';

const QontoConnector = withStyles({
	line: {
		borderStyle: 'dashed',
		borderColor: '#eaeaf0',
	},

	alternativeLabel: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	active: {
		'& $line': {
			borderColor: '#784af4',
		},
	},
	completed: {
		'& $line': {
			borderColor: '#784af4',
		},
	},
})(StepConnector);

export default function CustomizedSteppers(props) {
	const steps = Array(props.size).fill('');

	return (
		<Stepper alternativeLabel activeStep={props.current} connector={<QontoConnector />}>
			{steps.map((label) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}
