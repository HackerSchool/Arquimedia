import {
    Typography,
    Grid
} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { getProfile } from '../../api';
import Loading from '../loading/Loading';
import AvatarUser from '../avatar/AvatarUser';

// TODO: Include user's streak
function LeaderboardBar({id, place}) {
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile(id, (res) => {
            setProfile(res.data)
            setLoading(false);
        })
    }, [])

    if (loading) return <Loading />

    return (
        <Grid container justifyContent="space-between">
            <Grid item xs={2}>
                <AvatarUser user={profile.user} />
            </Grid>
            <Grid item xs={3}>
                <Typography>{profile.user.username}</Typography>
            </Grid>     
            <Grid item xs={7}>
                <Typography>{profile.xp.xp}</Typography>
            </Grid>
        </Grid>
    )
}

export default LeaderboardBar

