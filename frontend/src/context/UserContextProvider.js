import React, { createContext } from 'react';
import useUser from '../hooks/useUser.js';

export const userContext = createContext([{}, {}]);

export const UserContextProvider = (props) => {
	const [user, loading] = useUser();

	return <userContext.Provider value={[user, loading]}>{props.children}</userContext.Provider>;
};
