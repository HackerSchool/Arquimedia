import {Grid, Typography, responsiveFontSizes, createTheme, MuiThemeProvider, Select, FormControl, MenuItem, InputLabel, OutlinedInput, colors} from '@material-ui/core';
import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getAllAchievements } from "../../api"
import Loading from '../loading/Loading';


let theme = createTheme();
theme = responsiveFontSizes(theme);

/*
        xs, extra-small: 0px
        sm, small: 600px
        md, medium: 900px
        lg, large: 1200px
        xl, extra-large: 1536px 
*/

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,

    },
  },
};
const useStyles = makeStyles(theme => ({
}))


function AchivementTray({achievements, subjectProp}) {
    const filterAchievements = (toFilter, subject) => {
        // Geral includes all the achievements
        if (subject === "Geral") return toFilter;
        return toFilter.filter(object => object.subject === subject);
    }

    const classes = useStyles();
    const [allAchievements, setAllAchievements] = useState();
    const [loading, setLoading] = useState(true);
    const [achievementsToDisplay, setAchievementsToDisplay] = useState();

    // Updates the achievements to the current selected subject
    useEffect(() => {
        setAchievementsToDisplay(filterAchievements(allAchievements, subjectProp));
    }, [subjectProp]);

    useEffect(() => {
        getAllAchievements((res) => {
            setAllAchievements(res.data);
            setAchievementsToDisplay(filterAchievements(allAchievements ,subjectProp))
            setLoading(false);
        })
    }, []);

    if (loading) return <Loading />;

    return (
            <Grid className={classes.outterbox} container spacing={4}>

                <Grid item xs={12} >
                    <MuiThemeProvider theme = {theme}>
                        <Typography  variant='h5'>
                            Medalhas
                        </Typography>
                    </MuiThemeProvider>
                </Grid>

                <Grid item xs={12}>
                    {achievementsToDisplay.map(i => (
                        <h1>Ola</h1>
                    ))}
                </Grid>
            </Grid>
    )
}

export default AchivementTray
