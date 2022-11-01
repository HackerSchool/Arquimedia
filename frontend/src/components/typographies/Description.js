import React from 'react';
import { Typography } from '@mui/material';
import responsiveWidth from '../../hooks/responsiveWidth';

const Description = (props) => {
	const sxStyles = {
		DescriptiveText: {
			fontWeight: 'normal',
			fontSize: responsiveWidth(undefined, 10, 25, 0.012),
		},
	};
	return (
		<Typography sx={sxStyles.DescriptiveText} {...props}>
			{props.children}
		</Typography>
	);
};

export default Description;
