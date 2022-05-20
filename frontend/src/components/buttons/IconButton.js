import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import globalTheme from '../../globalTheme';

const useStyles = makeStyles(() => ({
	button: (props) => ({
		borderRadius: 25,
		fontSize: props.fontSize,
		textTransform: 'none',
		borderRigth: '4px',
		padding: '0 1rem 0 1rem',
		backgroundColor: props.backgroundColor,
		color: props.color,
		transition: 'transform 0.15s ease-in-out',
		'&:hover': {
			backgroundColor: '#E3E3E3',
			transform: `scale3d(${props.scale}, ${props.scale}, 1)`,
		},
	}),
}));

const IconButton = (props) => {
	const classes = useStyles(props);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={globalTheme}>
				<Button href={props.href} className={classes.button} onClick={props.onClick}>
					{props.iconFirst ? (
						<Grid
							direction={props.direction}
							justifyContent='space-between'
							alignItems={props.alignItems}
							container
						>
							<Grid item>{props.children}</Grid>

							<Grid item>{props.text}</Grid>
						</Grid>
					) : (
						<Grid
							direction={props.direction}
							justifyContent='space-between'
							alignItems={props.alignItems}
							container
						>
							<Grid item>{props.text}</Grid>

							<Grid item>{props.children}</Grid>
						</Grid>
					)}
				</Button>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

IconButton.propTypes = {
	text: PropTypes.string,
	href: PropTypes.string,
	fontSize: PropTypes.number,
	scale: PropTypes.number,
	children: PropTypes.elementType,
	direction: PropTypes.string,
	alignItems: PropTypes.string,
	iconFirst: PropTypes.bool,
};

IconButton.defaultProps = {
	color: 'white',
	backgroundColor: globalTheme.palette.secondary.main,
	fontSize: 100,
	scale: 1.1,
	direction: 'row',
	alignItems: 'center',
	iconFirst: true,
};

export default IconButton;
