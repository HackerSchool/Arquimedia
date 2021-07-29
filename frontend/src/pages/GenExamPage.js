import React, { useState } from "react";
import {
	Typography,
	Grid,
	Switch,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Button

} from "@material-ui/core";
import { SettingsInputAntenna, TurnedIn } from "@material-ui/icons";


const GenExamPage = () => {

	const [options, setOptions] = useState({
		randomSubSubject: true,
		geometry: false,
		imaginary: false,
		statistics: false,
		probability: false,
		randomGrade: true,
		tenthGrade: false,
		eleventhGrade: false,
		twelfthGrade: false
	})

	const handleChange = (event) => {		
		setOptions({...options, [event.target.name]: event.target.checked});
	}


	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="h2">Gera um exame</Typography>
			</Grid>
			<Grid item xs={4}>
				<FormControl>
					<FormLabel>Escolhe os temas</FormLabel>
					<FormGroup>
						<FormControlLabel control={<Checkbox checked={options.randomSubSubject} onChange={handleChange} name="randomSubSubject"/>} label="Aleatório"/>
						<FormControlLabel control={<Switch checked={options.geometry} onChange={handleChange} name="geometry"/>} label="Geometria"/>
						<FormControlLabel control={<Switch checked={options.imaginary} onChange={handleChange} name="imaginary"/>} label="Imaginários"/>
						<FormControlLabel control={<Switch checked={options.statistics} onChange={handleChange} name="statistics"/>} label="Estatística"/>
						<FormControlLabel control={<Switch checked={options.probability	} onChange={handleChange} name="probability"/>} label="Probabilidades"/>
					</FormGroup>
				</FormControl>
			</Grid>
			<Grid item xs={4}>
				<FormControl>
					<FormLabel>Escolhe os anos</FormLabel>
					<FormGroup>
						<FormControlLabel control={<Checkbox checked={options.randomGrade} onChange={handleChange} name="randomGrade"/>} label="Aleatório"/>
						<FormControlLabel control={<Switch checked={options.tenthGrade} onChange={handleChange} name="tenthGrade"/>} label="10º"/>
						<FormControlLabel control={<Switch checked={options.eleventhGrade} onChange={handleChange} name="eleventhGrade"/>} label="11º"/>
						<FormControlLabel control={<Switch checked={options.twelfthGrade} onChange={handleChange} name="twelfthGrade"/>} label="12º"/>
					</FormGroup>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained">Gerar exame</Button>
			</Grid>
			<Grid item>
				
			</Grid>
		</Grid>
	);
} 

export default GenExamPage;