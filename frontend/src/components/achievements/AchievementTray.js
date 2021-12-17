import {Grid, Typography, responsiveFontSizes, createTheme, MuiThemeProvider, Select, FormControl, MenuItem, InputLabel, OutlinedInput, colors} from '@material-ui/core';
import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getAllAchievements } from "../../api"
import Loading from '../loading/Loading';
import Achievement from './Achievement';

const useStyles = makeStyles(() => ({
    outterbox: {
        padding: "1rem"
    }
}))

function AchievementTray({achievements, subjectProp}) {
    const filterAchievements = (toFilter, subject) => {
        // Geral includes all the achievements
        if (subject === "Geral") return toFilter;

        const res = toFilter.filter(object => object.subject === subject);

        if (res === undefined) return [];

        return res;
    }

    const classes = useStyles();
    const [allAchievements, setAllAchievements] = useState();
    const [loading, setLoading] = useState(true);
    const [achievementsToDisplay, setAchievementsToDisplay] = useState([]);

    // Updates the achievements to the current selected subject
    useEffect(() => {
        setAchievementsToDisplay(filterAchievements(allAchievements, subjectProp));
    }, [subjectProp]);

    useEffect(() => {
        getAllAchievements((res) => {
            setAllAchievements(res.data);
            setAchievementsToDisplay(filterAchievements(res.data, subjectProp))
            setLoading(false);
        })
    }, []);

    if (loading) return <Loading />;

    return (
            <Grid className={classes.outterbox} container direction="column">

                <Grid item xs={12} >
                    <Typography  variant='h5'>
                        Medalhas
                    </Typography>
                </Grid>

                <Grid item container spacing={12} justify="space-between" xs={3}>
                        {achievementsToDisplay.map(i => (
                            <Grid item xs={1}>
                                <Achievement achievement={i} achieved={achievements.some(j => j.id === i.id)}/>
                            </Grid>
                        ))}
                </Grid>
            </Grid>
    )
}

export default AchievementTray;
