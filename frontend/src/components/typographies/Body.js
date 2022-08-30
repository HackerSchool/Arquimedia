import React from 'react';
import { Typography } from '@mui/material';
import responsiveWidth from '../../hooks/responsiveWidth';

const Body = (props) => {
	const sxStyles = {
		Body: {
			fontSize: responsiveWidth(undefined, 15, 30, 0.015),
		},
	};
	return (
		<Typography sx={sxStyles.Body} {...props}>
			{props.children}
		</Typography>
	);
};

export default Body;
