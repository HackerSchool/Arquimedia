import React, {useContext} from 'react'
import { isAuthenticated } from '../../api'
import { Route } from 'react-router-dom'
import { userContext } from '../../context/UserContextProvider'

// Only allows admins to access page
export const AdminRoute = (props) => {
	const [user] = useContext(userContext);

	if (isAuthenticated() && user?.admin) {
		return <Route {...props} />
	}
	
	// warn user of restricted access page
	return (
		<div>This is an admin only page</div>
	)
}
