import React from 'react';
import { Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../globalTheme';

const useStyles = makeStyles(() => ({
	box: {
		border: '2px solid',
		borderRadius: 20,
		borderColor: theme.palette.grey.primary,
		boxShadow: '-6px 7px 16px rgba(0, 0, 0, 0.25)',
		padding: '1rem',
	},
}));

const Box = (props) => {
	const classes = useStyles();

	return (
		<Paper className={classes.box} {...props}>
			{props.children}
		</Paper>
	);
};

export default Box;
