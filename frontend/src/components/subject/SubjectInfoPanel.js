import React from "react";
import { useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
    Grid,
    Select,
    MenuItem,
    Typography
} from "@mui/material";

const useStyles = makeStyles(theme => ({
	select: {
        fontSize: "2rem",
        "& .MuiSvgIcon-root": {
            color: "#EB5757"
        },
        '&.MuiOutlinedInput-notchedOutline': {
            borderRadius: 0,
        },
        'MuiOutlinedInput-notchedOutline': {
            border: 0,
        },
        '&:active .MuiOutlinedInput-notchedOutline': {
            border: 0,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0,
        },
    },
    indexCircle: index => ({
        backgroundColor: (index > 80 ? "#00FF47" : (index > 50 ? "#FFED47" : "#EB5757")),
        width: "9rem",
        height: "9rem",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem"
    }),
    index: {
        fontWeight: 600,
        color: "white"
    }
}));

const SubjectInfoPanel = ({profile, changeSubject}) => {
    const computeGeral = () => {
        let newGeralSubject = {
            id: null,
            wrongAnswers: [],
            correctAnswers: [],
            subject: "Geral",
            examCounter: 0,
            index: 0
        }

        profile.subjects.forEach(sub => {
            newGeralSubject.wrongAnswers = newGeralSubject.wrongAnswers.concat(sub.wrongAnswers);
            newGeralSubject.correctAnswers = newGeralSubject.correctAnswers.concat(sub.correctAnswers);
            newGeralSubject.examCounter += sub.examCounter;
            newGeralSubject.index += sub.index;
        }); 

        newGeralSubject.index /= profile.subjects.length;
        return newGeralSubject;
    }

    const geral = computeGeral();
    const [subject, setSubject] = useState(geral);
    const classes = useStyles(subject.index);

    const handleChange = (event) => {
        if (event.target.value === "Geral") {
            setSubject(geral);
            changeSubject("Geral");
        } else {
            setSubject(profile.subjects.filter((sub) => event.target.value === sub.subject)[0]);
            changeSubject(event.target.value);
        }
    };

    return (
        <Grid container direction="column" alignItems="stretch">
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
            <Grid item>
                <div className={classes.indexCircle}>
                    <Typography variant={"h3"} className={classes.index}>
                        {subject.index}
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
};

export default SubjectInfoPanel;