import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import {
    Popover,
    Paper,
    Typography,
    Grid
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    img: achieved => ({
        opacity: (achieved ? 1 : 0.3),
        height: "7rem",
        pointerEvents: "auto"
    }),
    popover: {
        pointerEvents: "none"
    },
    popoverInfo: {
        padding: "1rem"
    }
}))


const Achievement = ({achievement, achieved}) => {
    const classes = useStyles(achieved);
    const [anchorEl, setAnchorEl] = useState(null);
    const [hovered, setHovered] = useState(false);

    const handleOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <div>
            <img src={achievement.image} className={classes.img}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
            />
            <Popover
                id={id}
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
                }}
                className={classes.popover}
            >
                <Paper>
                    <Grid container className={classes.popoverInfo}>
                        <Grid item xs={12}>
                            <Typography variant="h5">{achievement.title}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">{achievement.description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">{achievement.xp} xp</Typography>
                        </Grid>
                    </Grid>   
                </Paper>
            </Popover>
        </div>
    )
}

export default Achievement;
