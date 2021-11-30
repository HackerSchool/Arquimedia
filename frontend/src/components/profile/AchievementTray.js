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
	outterbox: {
		borderRadius : 15,
        backgroundColor: '#999999C7',
	},
	innerbox: {
		borderRadius : 16,
		backgroundColor: '#CCC9C9',
	},
    select:{
        backgroundColor:'#FFFFFF',
        minWidth : 120,
        borderRadius: 5
    }
    
}))

const subjects = ['Todas','Matemática','Física e Química'];


function AchivementTray() {

    const classes = useStyles();
    const [selectedOption, setSelectedOption] = useState(subjects[0]);  
    

    return (
        <div>

            <Grid  className={classes.outterbox} container spacing={4}>

                <Grid item xs={true} >
                    <MuiThemeProvider theme = {theme}>
                        <Typography  variant='h5'>
                            Achivements
                        </Typography>
                    </MuiThemeProvider>
                </Grid>

                <Grid  item xs="auto">
				<Select className={classes.select}  value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}
                MenuProps = {MenuProps} label='Disciplinas' disableUnderline>
                    {subjects.map((subject)=>
                        <MenuItem value = {subject}>
                                <Typography variant= 'subtitle1'>
                                    {subject}
                                </Typography>
                        </MenuItem>
                    )}
				</Select>
                
                </Grid>
                <Grid>
                    {/* Dotted Line */}

                </Grid>
                <Grid item xs={12}>
                   
                    <AchivementsOutter class={classes.innerbox}></AchivementsOutter>
                </Grid>
            </Grid>
                
        </div>
    )
}

export default AchivementTray
