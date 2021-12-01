import React from 'react'
import {
    Grid,
    Avatar,
    Typography,
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	avatar: {
        width: "125px",
        height: "125px",
        
    },
    esquerda: {
        textAlign: 'left',
        marginLeft: "60px",
        padding: "5px",
    },
    xpBar: {
        colorPrimary: 'pink',
        colorSecondary: 'blue',
    },
    colorPrimary: {
        backgroundColor: '#FFFFFF',
    },
    barColorPrimary: {
        backgroundColor: '#00FF47',
    }
}));

const BorderLinearProgress = withStyles({
    root: {
        height: 20,
        width: "80%",
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#00FF47',
    },
})(LinearProgress);


export const ProfileBasicInfo = ({profile, XPEvents}) => {
    const classes = useStyles();

    const sumSimilar = arr => {
        const res = [];
        for (let i = 0; i < arr.length; i++) {
            const ind = res.findIndex(el => el.date === arr[i].date);
            if (ind === -1) {
                    res.push(arr[i]);
            } else {
                    res[ind].amount += arr[i].amount;
            };
        };
        return res;
    };

    const computeStreak = (events, hasGainedXpToday) => {
        events = sumSimilar(events);
        events.splice(6, 0, {
            date: "2021-11-30",
            amount: 160
        })
        events.splice(6, 0, {
            date: "2021-11-29",
            amount: 150
        })
        events.splice(6, 0, {
            date: "2021-11-28",
            amount: 200
        })
        events.splice(6, 0, {
            date: "2021-11-27",
            amount: 400
        })
        let currentDay = new Date();
        if (!hasGainedXpToday) currentDay.setDate(currentDay.getDate() - 1);
            
        return streakNumber(currentDay, events);
    };

    const streakNumber = (currentDay, events) => {
        if (!events.some(event => currentDay.getDate() === (new Date(event.date)).getDate() 
        && currentDay.getMonth() === (new Date(event.date)).getMonth()
        && currentDay.getFullYear() === (new Date(event.date)).getFullYear())) return 0;

        currentDay.setDate(currentDay.getDate() - 1)
        return streakNumber(currentDay, events) + 1;

    }

    const currentDay = new Date();
    const hasGainedXpToday = (currentDay.getDate() === (new Date(XPEvents.at(-1).date)).getDate() 
                                && currentDay.getMonth() === (new Date(XPEvents.at(-1).date)).getMonth()
                                && currentDay.getFullYear() === (new Date(XPEvents.at(-1).date)).getFullYear());
    const streak = computeStreak(XPEvents, hasGainedXpToday);
    console.log(hasGainedXpToday)
    return (
        <Grid container >
            <Grid item xs={12} style={{ padding: '10px' }}>
                <Avatar className={classes.avatar}>{profile.user.username[0]}</Avatar>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">@{profile.user.username}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.esquerda}>
                <Typography variant="h6">Nível: {profile.xp.currentLevel}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.esquerda}>
                <div className={classes.linear}>
                    <BorderLinearProgress 
                        variant="determinate"
                        value={profile.xp.xp/profile.xp.levelXP * 100}
                    />
                </div>
            </Grid>
            <Grid item xs={12} className={classes.esquerda}>
                <Typography variant="h6">
                    Streak: {streak} {hasGainedXpToday ? "🔥" : "🕯️"}
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.esquerda}>
                <Typography variant="h6">
                    A seguir: {profile.follows.length}
                </Typography>
            </Grid>
        </Grid>
    )
}


