import React from "react";
import { useState } from "react";
import {
    Grid,
    Select,
    MenuItem,
    Typography
} from "@material-ui/core";

const SubjectInfoPanel = ({profile}) => {
    console.log(profile)
    const [subject, setSubject] = useState(profile.subjects[0]);

    const handleChange = (event) => {
        const newSubject = profile.subjects.filter(sub => sub.subject === event.target.value)[0];
        setSubject(newSubject);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Select
                    labelId="subject"
                    id="subject"
                    value={subject.subject}
                    onChange={handleChange}
                >
                    {profile.subjects.map(subj => (
                        <MenuItem value={subj.subject}>{subj.subject}</MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Exames: {subject.examCounter}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Respostas erradas: {subject.wrongAnswers.length}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Respostas corretas: {subject.correctAnswers.length}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default SubjectInfoPanel;