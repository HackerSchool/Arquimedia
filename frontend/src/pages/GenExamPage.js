import React, { useState } from "react";
import {
	Typography,
	Grid,
	Divider,
	Select,
	Switch,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Button,
	MenuItem,
	ListSubheader
} from "@material-ui/core";
import { createExam } from "../api";
import { makeStyles } from '@material-ui/core/styles';
import AlertSnackBar from "../components/alerts/AlertSnackBar";
import { ReactComponent as RedRoundCheckmark } from "../assets/redroundcheck.svg";
import { ReactComponent as GreyRoundCheckbox } from "../assets/redroundcheckbg.svg";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';



const useStyles = makeStyles(theme => ({
	body: {
		textAlign: "center",
	},
	upperSideText:{
		color : theme.palette.secondary.main
	},
	bg:{
		backgroundColor:'black'
	},
	boxes:{
		backgroundColor:'black',
		border:"2px solid grey",
		borderRadius: '10px',
		padding:'10px',
		color:'white'
	},
    select: { //change select css, events and whatnot
		backgroundColor: 'black',
		borderRadius:'10px',
		border: "2px solid grey",
		color: "#fff",
		minHeight:'70px',
		minWidth: '150px',
		padding:'5px',
    },
    "& .MuiSvgIcon-root": {
        color: "white",
    },
}))

const GenExamPage = () => {
	const classes = useStyles();

	const [dictSubSubjects, setDictSubSubjects] = useState({
		geometry: false,
		imaginary: false,
		statistics: false,
		probability: false
	})

	const [dictYears, setDictYear] = useState({
		tenthGrade: false,
		eleventhGrade: false,
		twelfthGrade: false
	})

	const [options, setOptions] = useState({
		randomSubSubject: true,
		randomGrade: true
	})

	const [subject, setSubject] = useState("none")
	const [error, setError] = useState(false);

	const baseSubSubjects = {
		geometry: false,
		imaginary: false,
		statistics: false,
		probability: false
	}


	const baseYear = {
		tenthGrade: false,
		eleventhGrade: false,
		twelfthGrade: false
	}


	const resetDictYear = () => {
		setDictYear(baseYear)
	}


	const resetDictSubSubjects = () => {
		setDictSubSubjects(baseSubSubjects);
	}


	const handleChangeYear = (event) => {
		if (options.randomGrade) setOptions({...options, "randomGrade": false});
		setDictYear({...dictYears, [event.target.name]: event.target.checked});
	}


	const handleChangeSubSubjects = (event) => {
		if (options.randomSubSubject) setOptions({...options, "randomSubSubject": false});
		setDictSubSubjects({...dictSubSubjects, [event.target.name]: event.target.checked});
	}


	const handleChangeRandomSubSubject = (event) => {
		setOptions({...options, [event.target.name]: event.target.checked});

		if (!options.randomSubSubject) {
			resetDictSubSubjects();
		}
	}


	const handleChangeRandomGrade = (event) => {
		setOptions({...options, [event.target.name]: event.target.checked});

		if (!options.randomGrade) {
			resetDictYear();
		}
	}

	const handleChangeSubject = (event) => {
		
		setSubject(event.target.value)
	}



	const handleClick = () => {
		setError(false)
		if (subject == "none") {
			setError(true)
		} else {
	
			const subSubjects = [];

			if (dictSubSubjects.geometry) subSubjects.push("Geometria");

			if (dictSubSubjects.geometry) subSubjects.push("Imaginários");

			let year = 0;
			if (options.tenthGrade) year = 10;
			if (options.eleventhGrade) year = 11;
			if (options.twelfthGrade) year = 12;

			createExam({
				subject: subject,
				randomSubSubject: options.randomSubSubject,
				subSubjects: subSubjects,
				year: year
			}, (res) => {
				window.location.href = "/exame/" + res.data.id;
			})
		}
	}


	// TODO: REVIEW everything above this line for the new page, see if it makes sense
	return (
		<Grid container>
			<Grid item xs = {5}>
				<Typography className={classes.upperSideText} variant="h5" >Personaliza o teu exame</Typography>
			</Grid>
			<Grid item xs = {2}>
				<Typography variant="h6">ou</Typography> {/*Maybe put this in Bold */}
			</Grid>
			<Grid item xs = {5}>
				<Typography className={classes.upperSideText} variant="h5">Deixa isso connosco</Typography>
			</Grid>
			<Grid container xs = {12}>

				<Grid container xs ={5}> {/*left lower panel*/}
					<Grid alignContent="flex-start" container xs = {6}> {/*Pick Subject*/}
						<Grid item>
							<Typography> 1 - Escolhe a disciplina </Typography>
						</Grid>
						<Grid container>
							<Select
							 autoWidth
							 IconComponent={() => <ArrowDropDownRoundedIcon/>}
							 onChange={handleChangeSubject}
							 id="grouped-select"
							 defaultValue="none"
							 className={classes.select} 
							 disableUnderline> {/*Change how the exam is generated in accordance with what select gives back*/}
								<MenuItem  value="none"> Nenhuma</MenuItem>
								<ListSubheader>Ciências e Tecnologias</ListSubheader>
									<MenuItem value={"math"}>Matemática A</MenuItem>
									<MenuItem value={"physics"}>Física e Química</MenuItem>
								
								<ListSubheader>Línguas e Humanidades</ListSubheader>
									<MenuItem>História A</MenuItem>
							</Select>

						</Grid>
					</Grid> 

					<Grid container xs = {6}> {/* Pick year*/}
						<Grid item>
							<Typography> 2 - Escolhe o ano </Typography>
						</Grid>	
						<Grid container>
							<FormControl className={classes.boxes}>
								<FormGroup >
									<FormControlLabel control={<Checkbox checked={options.randomGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeRandomGrade} name="randomGrade"/>} label="Aleatório"/>
									<FormControlLabel control={<Checkbox checked={dictYears.tenthGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeYear} name="tenthGrade"/>} label="10º"/>
									<FormControlLabel control={<Checkbox checked={dictYears.eleventhGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeYear} name="eleventhGrade"/>} label="11º"/>
									<FormControlLabel control={<Checkbox checked={dictYears.twelfthGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeYear} name="twelfthGrade"/>} label="12º"/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid> 

					<Grid container xs ={12}> {/*Pick Themes*/}
						<Grid item>
							<Typography> 3 - Escolhe os tópicos </Typography>
						</Grid>
						<Grid container>
							<FormControl className={classes.boxes}>
								<FormGroup >
									<FormControlLabel control={<Checkbox checked={options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeRandomSubSubject} name="randomSubSubject"/>} label="Aleatório"/>
									<FormControlLabel control={<Checkbox checked={dictSubSubjects.geometry && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>}  onChange={handleChangeSubSubjects} name="geometry"/>} label="Geometria"/>
									<FormControlLabel control={<Checkbox checked={dictSubSubjects.imaginary && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeSubSubjects} name="imaginary"/>} label="Imaginários"/>
									<FormControlLabel control={<Checkbox checked={dictSubSubjects.statistics && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeSubSubjects} name="statistics"/>} label="Estatística"/>
									<FormControlLabel control={<Checkbox checked={dictSubSubjects.probability && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeSubSubjects} name="probability"/>} label="Probabilidades"/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid> 

					<Grid justifyContent="center" container > {/*Começar Button*/}
						<Grid>
							<Button variant="contained" onClick={handleClick}>Começar</Button>
						</Grid>
						
					</Grid>
					
						
						
					
				</Grid>

				<Grid container xs = {2}>
					<Divider style={{color:"red"}} orientation="vertical" flexItem /> {/*Vertical Divider*/}
				</Grid>
				
				
					

				<Grid container xs = {5}> {/*right lower panel*/}
					<Grid item>
						<Typography> Aqui ficamos responsáveis por gerar o melhor exame para ti, tendo em conta as tuas últimas performances. </Typography>
					</Grid>
					<Grid item>

					</Grid>

				</Grid>

			</Grid>
			<AlertSnackBar anchorOrigin={{ vertical:"bottom", horizontal:"right" }} open={error} text="Por favor selecione uma disciplina antes de começar" type="error"/>
		</Grid>








/* 		<Grid container className={classes.body}>
			<Grid item xs={12}>
				<Typography variant="h2">Gera um exame</Typography>
			</Grid>
			<Grid item xs={6}>
				<FormControl>
					<FormLabel>Escolhe os temas</FormLabel>
					<FormGroup>
						<FormControlLabel control={<Checkbox checked={options.randomSubSubject} onChange={handleChangeRandomSubSubject} name="randomSubSubject"/>} label="Aleatório"/>
						<FormControlLabel control={<Switch checked={dictSubSubjects.geometry && !options.randomSubSubject} onChange={handleChangeSubSubjects} name="geometry"/>} label="Geometria"/>
						<FormControlLabel control={<Switch checked={dictSubSubjects.imaginary && !options.randomSubSubject} onChange={handleChangeSubSubjects} name="imaginary"/>} label="Imaginários"/>
						<FormControlLabel control={<Switch checked={dictSubSubjects.statistics && !options.randomSubSubject} onChange={handleChangeSubSubjects} name="statistics"/>} label="Estatística"/>
						<FormControlLabel control={<Switch checked={dictSubSubjects.probability && !options.randomSubSubject} onChange={handleChangeSubSubjects} name="probability"/>} label="Probabilidades"/>
					</FormGroup>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<FormControl>
					<FormLabel>Escolhe os anos</FormLabel>
					<FormGroup>
						<FormControlLabel control={<Checkbox checked={options.randomGrade} onChange={handleChangeRandomGrade} name="randomGrade"/>} label="Aleatório"/>
						<FormControlLabel control={<Switch checked={dictYears.tenthGrade} onChange={handleChangeYear} name="tenthGrade"/>} label="10º"/>
						<FormControlLabel control={<Switch checked={dictYears.eleventhGrade} onChange={handleChangeYear} name="eleventhGrade"/>} label="11º"/>
						<FormControlLabel control={<Switch checked={dictYears.twelfthGrade} onChange={handleChangeYear} name="twelfthGrade"/>} label="12º"/>
					</FormGroup>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" onClick={handleClick}>Gerar exame</Button>
			</Grid>
			<Grid item>
				
			</Grid>
		</Grid> */


	);
} 

export default GenExamPage;