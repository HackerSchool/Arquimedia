import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
    Grid,
    Select,
    MenuItem,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	select: {
        fontSize: "2rem",
        "& .MuiSvgIcon-root": {
            color: "#EB5757"
        }
    }
}));

const SubjectInfoPanel = ({profile}) => {
    const classes = useStyles();
    const [subject, setSubject] = useState(profile.subjects[0]);

    const handleChange = (event) => {
        const newSubject = profile.subjects.filter(sub => sub.subject === event.target.value)[0];
        setSubject(newSubject);
    };

    return (
        <Grid container direction="column" alignItems="stretch" spacing={1}>
            <Grid item>
                <Select
                    labelId="subject"
                    id="subject"
                    value={subject.subject}
                    onChange={handleChange}
                    disableUnderline
                    className={classes.select}
                >
                    {profile.subjects.map(subj => (
                        <MenuItem value={subj.subject}>{subj.subject}</MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item>
                <Typography variant={"h6"}>
                    Exames: {subject.examCounter}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h6"}>
                    Respostas erradas: {subject.wrongAnswers.length}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h6"}>
                    Respostas corretas: {subject.correctAnswers.length}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default SubjectInfoPanel;