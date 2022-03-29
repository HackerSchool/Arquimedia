import React, {createContext, useReducer} from 'react'
import AlertSnackBar from '../components/alerts/AlertSnackBar';

export const notificationsContext = createContext();

const 

const reducer = (notifications, action) => {
	switch (action.type) {
		case: 'add':
			return 
		case: 'remove'
			return 
	}
}

export const NotificationsProvider = (props) => {
	const [notifications, dispatch] = useReducer();

	return (
		<notificationsContext.provider>
			{props.children}
		</notificationsContext.provider>
	)
}
