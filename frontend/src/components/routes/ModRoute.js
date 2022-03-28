import React, {useContext} from 'react'
import { userContext } from '../../context/UserContextProvider'
import { isAuthenticated } from '../../api'
import { Route } from 'react-router-dom'

// Only allows moderators to access page
export const ModRoute = (props) => {
	const [user] = useContext(userContext);

	if (isAuthenticated() && user?.mod) {
		return <Route {...props} />
	}
	
	// warn user of restricted access page
	return (
		<div>This is a moderator only page</div>
	)
}
