import React from 'react';
import { Paper } from '@mui/material';
import theme from '../../globalTheme';

const sxStyles = {
	box: {
		border: '2px solid',
		borderRadius: 5,
		borderColor: theme.palette.grey.primary,
		boxShadow: '-6px 7px 16px rgba(0, 0, 0, 0.25)',
		padding: '1rem',
	},
};

const Box = (props) => {
	return (
		<Paper sx={sxStyles.box} {...props}>
			{props.children}
		</Paper>
	);
};

export default Box;
