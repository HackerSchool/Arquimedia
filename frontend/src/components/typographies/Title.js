import React from 'react';
import { Typography } from '@mui/material';
import responsiveWidth from '../../hooks/responsiveWidth';

const Title = (props) => {
	const sxStyles = {
		Title: {
			paddingBottom: '3vh',
			fontWeight: 'bold',
			fontSize: responsiveWidth(undefined, 25, undefined, 0.027),
		},
	};
	return (
		<Typography sx={sxStyles.Title} {...props}>
			{props.children}
		</Typography>
	);
};

export default Title;
