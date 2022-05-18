import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import globalTheme from '../../globalTheme'

const useStyles = makeStyles(theme => ({
	button: props => ({
		borderRadius: 25,
		fontSize: props.fontSize,
		textTransform: "none",
		borderRigth: "4px",
		padding: "0 1rem 0 1rem",
		backgroundColor: props.backgroundColor,
		color: props.color,
		transition: "transform 0.15s ease-in-out",
		'&:hover': {
			backgroundColor: "#E3E3E3",
			transform: `scale3d(${props.scale}, ${props.scale}, 1)`,
			boxShadow: "0px 6px 4px #Bbb9b9",
		},
	})
}))

const NormalButton = props => {
	const classes = useStyles(props);

	return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={globalTheme}>
                <Button
                    href={props.href}
                    className={classes.button}
                    onClick={props.onClick}
                    >

                        {props.text}

                </Button>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

NormalButton.propTypes = {
	text: PropTypes.string,
	href: PropTypes.string,
	fontSize: PropTypes.number,
	scale: PropTypes.number,
}

NormalButton.defaultProps = {
	color: "white",
	backgroundColor: globalTheme.palette.secondary.main,
	fontSize: 100,
	scale: 1.1
}

export default NormalButton
