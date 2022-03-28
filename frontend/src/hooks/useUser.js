import React, {useEffect, useState, useRef} from 'react'
import { getUser } from '../api';

export default function useUser() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const cache = useRef({})

	useEffect(() => {
		setLoading(true)
		if (cache.current[user]) {
			const data = cache.current[user];
			console.log("using cache")
			setUser(data);
		} else {
			getUser((res) => {
				setUser(res.data);
				cache.current[user] = res.data;
				console.log("using api")
			}, () => {
				
			})
		};
		setLoading(false);
	}, [user])

	return [user, loading];
}
