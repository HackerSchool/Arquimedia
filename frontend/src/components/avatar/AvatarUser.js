import React from 'react';
import { Avatar } from '@mui/material';
import md5 from 'md5';

// user isn't really an user object but more like the props object
// for some reason this component breaks when I change the name of the prop
// FIXME
// Maybe add size prop and request gravatar image size depending on that size prop
function AvatarUser({ user, ...rest }) {
	const base = 'https://www.gravatar.com/avatar/';

	const hash = md5(user.email.trim().toLowerCase(), { encoding: 'binary' });

	// d=retro -> default image that gravatar returns in case the email has no gravatar image
	// s=400   -> image size
	const src = base + hash + '.png?d=retro&s=400';

	return (
		<Avatar className={user.className} src={src} {...rest}>
			{user.username[0]}
		</Avatar>
	);
}

export default AvatarUser;
