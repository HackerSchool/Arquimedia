import React, {useContext} from 'react'
import { userContext } from '../context/UserContextProvider'
import { isAuthenticated } from '../api'
import { Route, Redirect } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Loading from '../components/loading/Loading'

// Only allows moderators to access page
export const ModRoute = (props) => {
	const [user, loading] = useContext(userContext);
	const { enqueueSnackbar } = useSnackbar();

	if (loading) return <Loading />

	if (isAuthenticated() && user?.mod) {
		return <Route {...props} />
	}
	
	// warn user of restricted access page
	enqueueSnackbar("Ops... Esta página é de acesso restrito!", {variant: "error"})
	return (
		<Redirect to="/" />
	)
}
