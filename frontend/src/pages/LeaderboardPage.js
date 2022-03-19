import React, {useState, useEffect} from 'react'
import {
    Grid,
    Paper,
    Select,
    MenuItem,
    makeStyles,
    Typography
} from '@material-ui/core'
import { fetchLeaderboard } from '../api'
import Loading from '../components/loading/Loading';
import LeaderboardBar from '../components/profile/LeaderboardBar';
import globalTheme from '../globalTheme';

const SPANS = [
    "mês",
    "dia"
]

const TO_ENGLISH = {
    "mês": "month",
    "dia": "day"
}

const useStyles = makeStyles(theme => ({
    panel: {
        width: "70%",
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    dropdown: {
        fontSize: globalTheme.typography.h4.fontSize,
        '&.gutters': {
            fontSize: globalTheme.typography.h4.fontSize,
        },
        color: globalTheme.palette.secondary.main
    },
    title: {
        marginLeft: '1rem'
    }
}))

function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState();
    const [span, setSpan] = useState("mês");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const classes = useStyles();

    useEffect(() => {
        fetchLeaderboard(TO_ENGLISH[span], (res) => {
            setLeaderboard(res.data);
            setLoading(false);
        })
    }, [span])

    if (loading) return <Loading />

    const handleChange = (event) => {
        setSpan(event.target.value);
        setLoading(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Paper className={classes.panel}>
            <Typography variant='h4' className={classes.title}>
                Leaderboard do <span/>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={span}
                    onChange={handleChange}
                    className={classes.dropdown}
                >   
                    {SPANS.map((span) => (
                        <MenuItem value={span}>{span}</MenuItem>
                    ))}
                </Select>
            </Typography>

            <Grid container>
                {leaderboard.map((user, index) => (
                    <LeaderboardBar id={user.id} place={index + 1}/>
                ))}
            </Grid> 
        </Paper>
    )
}

export default LeaderboardPage
