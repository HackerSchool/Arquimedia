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

    const computeGeral = () => {
        let newGeralSubject = {
            id: null,
            wrongAnswers: [],
            correctAnswers: [],
            subject: "Geral",
            examCounter: 0
        }

        profile.subjects.forEach(sub => {
            newGeralSubject.wrongAnswers = newGeralSubject.wrongAnswers.concat(sub.wrongAnswers);
            newGeralSubject.correctAnswers = newGeralSubject.correctAnswers.concat(sub.correctAnswers);
            newGeralSubject.examCounter += sub.examCounter;
        }); 

        return newGeralSubject;
    }

    const handleChange = (event) => {
        if (event.target.value === "Geral") {
            setSubject(computeGeral());
        } else {
            setSubject(profile.subjects.filter((sub) => event.target.value === sub.subject)[0]);
        }
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
                        <MenuItem value={"Geral"}>Geral</MenuItem>
                        
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