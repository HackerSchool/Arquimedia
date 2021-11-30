import {Grid, Typography, responsiveFontSizes, createTheme, MuiThemeProvider, Select, FormControl, MenuItem, InputLabel, OutlinedInput, colors} from '@material-ui/core';
import {React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AchivementsOutter from '../../containers/AchievementsOutter';


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


function AchivementTray() {
    const classes = useStyles();

    return (
            <Grid  className={classes.outterbox} container spacing={4}>

                <Grid item xs={12} >
                    <MuiThemeProvider theme = {theme}>
                        <Typography  variant='h5'>
                            Achivements
                        </Typography>
                    </MuiThemeProvider>
                </Grid>

                <Grid item xs={12}>

                </Grid>
            </Grid>
    )
}

export default AchivementTray
