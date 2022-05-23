import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import globalTheme from '../../globalTheme';

const useStyles = makeStyles(() => ({
	button: (props) => ({
		borderRadius: 25,
		fontSize: props.fontSize,
		textTransform: 'none',
		borderRigth: '4px',
		padding: '1rem',
		backgroundColor: props.backgroundColor,
		color: props.color,
		transition: 'transform 0.15s ease-in-out',
		height: props.height,
		width: props.width,
		flexDirection: props.direction,
		justifyContent: props.justifyContent,
		alignItems: props.alignItems,
		'&:hover': {
			backgroundColor: '#E3E3E3',
			transform: `scale3d(${props.scale}, ${props.scale}, 1)`,
			boxShadow: '-3px 3px 4px #Bbb9b9',
		},
	}),
	semibold: {
		fontWeight: 500,
	},
}));

const IconButton = (props) => {
	const classes = useStyles(props);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={globalTheme}>
				{props.iconFirst ? (
					<Button
						href={props.href}
						classes={{ root: classes.button, label: classes.label }}
						onClick={props.onClick}
					>
						<>{props.children}</>
						<Typography variant={props.variant}> {props.text} </Typography>
					</Button>
				) : (
					<Button
						href={props.href}
						classes={{ root: classes.button, label: classes.label }}
						onClick={props.onClick}
					>
						<Typography className={classes.semibold} variant={props.variant}>
							{' '}
							{props.text}{' '}
						</Typography>
						<>{props.children}</>
					</Button>
				)}
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
	iconFirst: PropTypes.bool,
	spacing: PropTypes.number,
	width: PropTypes.string,
	height: PropTypes.string,
	variant: PropTypes.string,
	justifyContent: PropTypes.string,
	alignItems: PropTypes.string,
};

IconButton.defaultProps = {
	color: 'white',
	backgroundColor: globalTheme.palette.secondary.main,
	fontSize: 100,
	scale: 1.05,
	direction: 'row',
	iconFirst: true,
	spacing: 6,
	height: '23vh',
	width: '12vw',
	variant: 'h5',
	justifyContent: 'space-between',
	alignItems: 'start',
};

export default IconButton;
