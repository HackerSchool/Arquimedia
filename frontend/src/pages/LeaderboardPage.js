import React, {useState, useEffect} from 'react'
import {
    Grid,
    Paper,
    Typography,
    Select,
    MenuItem
} from '@material-ui/core'
import { fetchLeaderboard } from '../api'
import Loading from '../components/loading/Loading';
import LeaderboardBar from '../components/profile/LeaderboardBar';

const SPANS = [
    "month",
    "day"
]

function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState();
    const [span, setSpan] = useState("month");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard(span, (res) => {
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
        <Paper>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={span}
                onChange={handleChange}
            >   
                {SPANS.map((span) => (
                    <MenuItem value={span}>{span}</MenuItem>
                ))}
            </Select>
            <Grid container>
                {leaderboard.map((user, index) => (
                    <LeaderboardBar id={user.id} place={index + 1}/>
                ))}
            </Grid> 
        </Paper>
    )
}

export default LeaderboardPage
