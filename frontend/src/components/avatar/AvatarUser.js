import React from 'react';
import { Avatar } from '@material-ui/core';
import md5 from 'md5';

function AvatarUser(user) {

    const base = "https://www.gravatar.com/avatar/";

    const hash = md5(user.user.email.trim().toLowerCase(), {encoding: "binary"});

    // d=retro -> default image that gravatar returns in case the email has no gravatar image
    const src = base + hash + ".png?d=retro";

    console.log(src)

    return (
        <Avatar src={src} style={{height: "100%", width: "100%"}}>{user.user.username[0]}</Avatar>
    )
}

export default AvatarUser;
