import React from 'react';
import { Button } from '@mui/material';
import Subtitle from '../typographies/Subtitle';
import globalTheme from '../../globalTheme';

const NavbarButton = (props) => {
	// eslint-disable-next-line no-unused-vars
	const currentPage = window.location.pathname === props.href;
	return (
		<Button href={props.href} {...props}>
			<Subtitle
				style={{
					color: currentPage
						? globalTheme.palette.primary.main
						: globalTheme.palette.secondary.main,
				}}
			>
				{props.text}
			</Subtitle>
		</Button>
	);
};

export default NavbarButton;
