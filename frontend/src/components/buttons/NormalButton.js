import React from 'react'
import PropTypes from 'prop-types'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	button: props => ({
		color: props.color,
		backgroundColor: props.bgColor,
		borderRadius: 14,
		fontSize: props.fontSize,
		textTransform: "none",
	})
}))

const NormalButton = props => {
	const classes = useStyles(props);

	return (
		<Button href={props.href} className={classes.button}>{props.text}</Button>
	)
}

NormalButton.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
	bgColor: PropTypes.string,
	href: PropTypes.string,
	fontSize: PropTypes.number
}

NormalButton.defaultProps = {
	color: "white",
	bgColor: "red",
	fontSize: 100
}

export default NormalButton
