import React, {useContext} from 'react'
import { userContext } from '../context/UserContextProvider'
import { isAuthenticated } from '../api'
import { Route, Redirect } from 'react-router-dom'
import { useSnackbar } from 'notistack'

// Only allows moderators to access page
export const ModRoute = (props) => {
	const [user] = useContext(userContext);
	const { enqueueSnackbar } = useSnackbar();

	if (isAuthenticated() && user?.mod) {
		return <Route {...props} />
	}
	
	// warn user of restricted access page
	enqueueSnackbar("Ops... Esta página é de acesso restrito!")
	return (
		<Redirect to="/" />
	)
}
