import React from 'react';
import { Typography } from '@mui/material';
import responsiveWidth from '../../hooks/responsiveWidth';
import theme from '../../globalTheme';

const Subtitle = (props) => {
	const sxStyles = {
		Subtitle: {
			fontWeight: 'bold',
			fontSize: responsiveWidth(undefined, 20, 35, 0.017),
			color: theme.palette.secondary.main,
		},
	};
	return (
		<Typography sx={sxStyles.Subtitle} {...props}>
			{props.children}
		</Typography>
	);
};

export default Subtitle;
