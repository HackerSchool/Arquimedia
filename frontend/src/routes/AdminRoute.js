import React, {useContext} from 'react'
import { isAuthenticated } from '../../api'
import { Route, Redirect } from 'react-router-dom'
import { userContext } from '../../context/UserContextProvider'
import { useSnackbar } from 'notistack'

// Only allows admins to access page
export const AdminRoute = (props) => {
	const [user] = useContext(userContext);
	const { enqueueSnackbar } = useSnackbar(); 

	if (isAuthenticated() && user?.admin) {
		return <Route {...props} />
	}
	
	// warn user of restricted access page
	enqueueSnackbar("Ops... Esta página é de acesso restrito!")
	return (
		<Redirect to="/" />
	)
}
