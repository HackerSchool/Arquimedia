import {useEffect, useState} from 'react'
import { getUser } from '../api';

let cache;

export default function useUser() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true)
		if (cache) {
			setUser(cache);
			setLoading(false);
		} else {
			getUser((res) => {
				setUser(res.data);
				cache = res.data;
				setLoading(false);
			}, () => {
				setLoading(false);
			}
			)
		};
	}, [user])

	return [user, loading];
}
