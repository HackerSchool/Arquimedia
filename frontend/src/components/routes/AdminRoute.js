import React from 'react'
import { isAuthenticated } from '../../api'

// Only allows admins to access page
export const AdminRoute = (props) => {

	if (isAuthenticated() && props.user.admin) {
		return <Route {...props} />
	}
	
	// warn user of restricted access page
	return (
		<div>This is an admin only page</div>
	)
}
