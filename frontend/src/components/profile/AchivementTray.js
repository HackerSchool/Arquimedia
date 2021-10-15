import { Box, Grid, Container, Paper } from '@material-ui/core';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/styles/createPalette';
import AchivementsOutter from '../../containers/AchivementsOutter';

/*
        xs, extra-small: 0px
        sm, small: 600px
        md, medium: 900px
        lg, large: 1200px
        xl, extra-large: 1536px 
*/
const useStyles = makeStyles(theme => ({
	outterbox: {
		borderRadius : 15,
        backgroundColor: '#999999C7',
        boxShadow: green,
	},
	innerbox: {
		borderRadius : 16,
		backgroundColor: '#CCC9C9',
	},
}))


function AchivementTray() {

    const classes = useStyles();

    return (
        <div>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                <AchivementsOutter/>
                </Grid>
            </Grid>
                
        </div>
    )
}

export default AchivementTray
