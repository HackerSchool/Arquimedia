import React from 'react'
import PropTypes from 'prop-types'
import { Button, makeStyles } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core'
import globalTheme from '../../globalTheme'

const useStyles = makeStyles(theme => ({
	button: props => ({
		borderRadius: 25,
		fontSize: props.fontSize,
		textTransform: "none",
		borderRigth: "4px",
		padding: "0 1rem 0 1rem",
		backgroundColor: props.backgroundColor,
		color: props.color
	})
}))

const NormalButton = props => {
	const classes = useStyles(props);

	return (
		<ThemeProvider theme={globalTheme}>
			<Button
				href={props.href}
				className={classes.button}
				onClick={props.onClick}
				>

					{props.text}

			</Button>
		</ThemeProvider>
	)
}

NormalButton.propTypes = {
	text: PropTypes.string,
	href: PropTypes.string,
	fontSize: PropTypes.number
}

NormalButton.defaultProps = {
	color: "white",
	backgroundColor: globalTheme.palette.secondary.main,
	fontSize: 100
}

export default NormalButton
