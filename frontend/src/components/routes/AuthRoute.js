import React from 'react'
import { isAuthenticated } from '../../api'
import { Route, Redirect } from 'react-router-dom'

export const AuthRoute = props => {
	if (isAuthenticated()) return <Route {...props} />
	
	return (
		<Redirect to="/login" />
	)
}
