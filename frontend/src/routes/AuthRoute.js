import React from 'react'
import { isAuthenticated } from '../api'
import { Route, Redirect } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export const AuthRoute = props => {
	const { enqueueSnackbar } = useSnackbar();

	if (isAuthenticated()) return <Route {...props} />
	
	enqueueSnackbar("Inicia sessão para aceder a esta página.")
	return (
		<Redirect to="/login" />
	)
}
