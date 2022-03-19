import {
    Typography,
    Grid
} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { getProfile } from '../../api';
import Loading from '../loading/Loading';
import AvatarUser from '../avatar/AvatarUser';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	xp: {
		marginLeft: "auto"
	},
    icon: {
        margin: "0 1rem 0 1rem"
    },
    container: {
        margin: '1rem'
    }
}))

// TODO: Include user's streak
function LeaderboardBar({id, place}) {
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);

    const classes = useStyles();

    useEffect(() => {
        getProfile(id, (res) => {
            setProfile(res.data)
            setLoading(false);
        })
    }, [])

    if (loading) return <Loading />

    return (
        <Grid container alignItems='center' className={classes.container}>
            <Grid item>
                <Typography>{place}</Typography>    
            </Grid>
            <Grid item className={classes.icon}>
                <AvatarUser user={profile.user} />
            </Grid>
            <Grid item>
                <Typography>{profile.user.username}</Typography>
            </Grid>     
            <Grid className={classes.xp}>
                <Typography>{profile.xp.xp} XP</Typography>
            </Grid>
        </Grid>
    )
}

export default LeaderboardBar

