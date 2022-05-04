import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { InputBase } from '@mui/material';

const useStyles = makeStyles(() => ({
	input: (props) => ({
		backgroundColor: props.backgroundColor ? props.backgroundColor : '#FFF',
		borderRadius: 50,
		disableUnderline: true,
		height: 65,
		width: '22rem',
	}),
}));

export const TextInput = (props) => {
	const classes = useStyles(props);

	return (
		<InputBase
			className={classes.input}
			inputProps={{
				style: {
					margin: '0 1rem 0 1rem',
					fontSize: props.fontSize,
					color: props.fontColor && props.fontColor,
				},
			}}
			{...props}
		/>
	);
};
