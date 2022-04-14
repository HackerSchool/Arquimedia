import React, { useEffect } from 'react'
import { isAuthenticated } from '../api'
import { Route, Redirect } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export const AuthRoute = props => {
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (!isAuthenticated()) {
			enqueueSnackbar("Inicia sessão para aceder a esta página.", {variant: "warning"})
		}
	}, [enqueueSnackbar]);

	if (isAuthenticated()) return <Route {...props} />
	
	return (
		<Redirect to="/login" />
	)
}
