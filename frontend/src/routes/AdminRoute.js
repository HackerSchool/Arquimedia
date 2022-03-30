import React, { useContext, useEffect } from 'react'
import { isAuthenticated } from '../../api'
import { Route, Redirect } from 'react-router-dom'
import { userContext } from '../../context/UserContextProvider'
import { useSnackbar } from 'notistack'
import Loading from '../components/loading/Loading'

// Only allows admins to access page
export const AdminRoute = (props) => {
	const [user, loading] = useContext(userContext);
	const { enqueueSnackbar } = useSnackbar(); 

	useEffect(() => {
		if (!loading && (!isAuthenticated() || !user?.admin)) {
			enqueueSnackbar("Ops... Esta página é de acesso restrito!", {variant: "error"})
		}
	}, [loading, enqueueSnackbar, user]);

	if (loading) return <Loading />

	if (isAuthenticated() && user?.admin) {
		return <Route {...props} />
	}
	
	// warn user of restricted access page
	enqueueSnackbar("Ops... Esta página é de acesso restrito!")
	return (
		<Redirect to="/" />
	)
}
