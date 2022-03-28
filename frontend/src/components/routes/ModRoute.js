import React from 'react'
import { isAuthenticated } from '../../api'

// Only allows moderators to access page
export const ModRoute = (props) => {

	if (isAuthenticated() && props.user.mod) {
		return <Route {...props} />
	}
	
	// warn user of restricted access page
	return (
		<div>This is a moderator only page</div>
	)
}
