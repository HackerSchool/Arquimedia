import React from 'react';
import {Grid} from '@material-ui/core';
import Dropdown from 'react-dropdown';

function AchivementsOutter() {
    const subjects=["Matemática", "Física e Química", "Todas as disciplinas"];
    const defaultOption = subjects[subjects.length - 1]

    return (
        <div>
            <Grid container spacing={4}>

                <Grid item xs={10}>
                </Grid>

                <Grid item xs="auto">

                    <Dropdown options={subjects} onChange={null} value={defaultOption} placeholder="Filtra por Disciplina" />
                
                </Grid>
            </Grid>
        </div>
    )
}

export default AchivementsOutter
