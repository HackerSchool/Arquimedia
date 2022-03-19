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
import Pagination from '@material-ui/lab/Pagination';

const SPANS = [
    "mês",
    "dia"
]

const TO_ENGLISH = {
    "mês": "month",
    "dia": "day"
}

const USERS_PER_PAGE = 2

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
    const [leaderboard, setLeaderboard] = useState([]);
    const [span, setSpan] = useState("mês");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

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

    const pageChange = (event, value) => {
        setPage(value);
    }

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
                {leaderboard
                .slice(USERS_PER_PAGE * (page - 1), USERS_PER_PAGE * page)
                .map((user, index) => (
                    <LeaderboardBar key={user.id} id={user.id} place={index + 1}/>
                ))}
            </Grid> 

            <Grid container>
                <Pagination
                    onChange={pageChange}
                    defaultPage={1}
                    color='secondary' 
                    count={leaderboard.length > USERS_PER_PAGE ? Math.ceil(leaderboard.length / USERS_PER_PAGE) : 1}/>
            </Grid>
        </Paper>
    )
}

export default LeaderboardPage
