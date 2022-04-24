import React, { useState } from "react";
import {
	Typography,
	Grid,
	Divider,
	Select,
	FormControl,
	FormGroup,
	FormControlLabel,
	MenuItem,
	ListSubheader,
	List,
	ListItemText,
	ListItem,
	ListItemIcon,
	IconButton,
	useMediaQuery,
	Box
} from '@mui/material';
import { createExam } from "../api";
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import NormalButton from "../components/buttons/NormalButton";
import { ReactComponent as RedRoundArrow } from "../assets/redroundarrow.svg";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useSnackbar } from 'notistack';
import { Checkbox } from "../components/checkbox/Checkbox";
import  config  from "../config";

const useStyles = makeStyles(theme => ({
	body: {
	},
	lowerPanel:{
		margin:'25px 0px'
	},
	divider:{
		height:'calc(85%)',
	},
	ou:{
		margin: "0px -13px"
	},
	upperSideText:{
		color : theme.palette.secondary.main,
		[theme.breakpoints.down(1100)]: {
			margin: "30px 0px"
		}
	},
	boxes:{
		backgroundColor: theme.palette.background.default,
		border:"2px solid #D9D9D9",
		borderRadius: '10px',
		padding:'10px',
		color: theme.palette.text.primary,
		boxShadow:'-2px 2px 2px #D9D9D9' ,
	},
    select: { //change select css, events and whatnot
		backgroundColor: "inherit",
		border:"2px solid #D9D9D9",
		borderRadius: '10px',
		color: theme.palette.text.primary,
		minHeight:'70px',
		minWidth: 'calc(70%)',
		maxWidth: 150,
		padding:'5px',
		boxShadow:'-2px 2px 2px #D9D9D9',
    },
	selectRoot: {
		"&:focus": {
			backgroundColor: theme.palette.background.default
		}
	},
	paper: {
		background: theme.palette.background.default,
		color: theme.palette.text.primary,
	},
	subheader:{
		color:'grey',
	},
    icon: {
		fill: theme.palette.text.primary,
		margin: "0px 7px"
	},
	rootMenuItem: {
		"&$selected": {
		  backgroundColor: theme.palette.grey.primary,
			"&:hover": {
			  backgroundColor: theme.palette.background.default
			 }
		  },
		'&:hover':{
		  backgroundColor:"#F6F6F6"
		}
	},
	list: {
		backgroundColor: theme.palette.background.default,
		overflow: 'auto',
		maxHeight: 300,
		'&::-webkit-scrollbar': {
			width: '0.7em'
		},
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
			webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#C4C4C4',
			borderRadius: '50px',
		}
	  },
	listSection: {
		backgroundColor: 'inherit',
		color:'inherit',
		padding:30,
	},
	ul: {
		padding: 0,
		backgroundColor: 'inherit',
		color:'inherit',
	},
	listItem :{
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		border:"2px solid #D9D9D9",
		borderRadius: '10px',
		margin: '30px 0px',
		padding: 7,
		boxShadow:'-2px 2px 2px #D9D9D9' ,
		},
	rightArrow:{
		color:'EB5757',

	},
	button:{
		margin: ' 30px 15px',
		
	},
}))

const GenExamPage = () => {
	const classes = useStyles();

	const theme = useTheme();

	const is1100pxScreen = useMediaQuery(theme.breakpoints.down(1100));

	const [dictSubSubjects, setDictSubSubjects] = useState({})

	const baseSubSubjects = {}

	const [dictYears, setDictYear] = useState({})
	
	const baseYears = {}

	const [options, setOptions] = useState({
		randomSubSubject: true,
		randomGrade: true
	})

	const { enqueueSnackbar } = useSnackbar();

	const [subject, setSubject] = useState(-1)

	const courseArray = [
		{
			name: "Ciências e Tecnologias",
			subjects:[
			"Matemática A",
			"Física e Química"],
			subjectsKey:['math', 'physics'],
		},
		{
			name: "Línguas e Humanidades",
			subjects:[
				"História A"
			],
			subjectsKey:['none'],
		},
		
	]

	const resetDictYear = () => {
		setDictYear(baseYears);
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
		
		if (event.target.value != -1){
			config.subjects[event.target.value].years.map((year) => {
				baseYears[year] = false
			});
			config.subjects[event.target.value].themes.forEach((theme) => {
				baseSubSubjects[theme] = false
			});
			
			setDictYear(baseYears)
			setDictSubSubjects(baseSubSubjects)
		}
		
	}



	const handleClick = () => {
		if (subject === -1) {
			enqueueSnackbar("Por favor selecione uma disciplina antes de começar", {variant: "warning"})
		} else {
	
			let subSubjects = [];

			for (const [key, value] of Object.entries(dictSubSubjects)) {
				if (value) subSubjects.push(key);
				
			}

			let year = [];

			for (const [key, value] of Object.entries(dictYears)) {
				if (value) year.push(key);
				console.log(key, value);
			}

			createExam({
				subject: config.subjects[subject].name,
				randomSubSubject: options.randomSubSubject,
				subSubjects: subSubjects,
				year: year
			}, (res) => {
				window.location.href = "/exame/" + res.data.id;
			})
		}
	}

	
	const handleClickCustom = (subject) => { //Function for the perosnalised Exam experience of the right Panel
		


		if (!subject.active) {
			enqueueSnackbar("Disciplina indisponível", {variant: "warning"})
		} else {
	
			const subSubjects = [];

			if (dictSubSubjects.geometry) subSubjects.push("Geometria");

			if (dictSubSubjects.geometry) subSubjects.push("Imaginários");

			let year = 0;
			if (options.tenthGrade) year = 10;
			if (options.eleventhGrade) year = 11;
			if (options.twelfthGrade) year = 12;

			createExam({

				subject: subject.name,
				randomSubSubject: options.randomSubSubject,
				subSubjects: subSubjects,
				year: year
			}, (res) => {
				window.location.href = "/exame/" + res.data.id;
			})
		}
		
	}

	return (
		
		<Grid justifyContent="center" container alignItems="center" direction={is1100pxScreen ? "column" : "row"}>
			{is1100pxScreen 

			?

				<Grid item xs = {12}>
					<Typography className={classes.upperSideText} variant="h5" >Personaliza o teu exame</Typography>
				</Grid> 
			: 

			<Grid xs={10} container direction="row" justifyContent="space-evenly" alignItems="center">
				<Grid item xs = {4}>
					<Typography className={classes.upperSideText} variant="h5" >Personaliza o teu exame</Typography>
				</Grid> 
				<Grid item xs = {1}>
					<Typography className={classes.ou} variant="h6">ou</Typography> {/*Maybe put this in Bold */}
				</Grid>
				<Grid item xs = {4}>
					<Typography className={classes.upperSideText} variant="h5">Deixa isso connosco</Typography>
				</Grid>
			</Grid>
			}
			<Grid direction={is1100pxScreen ? "column" : "row"} className={classes.lowerPanel} container xs = {11}>

				<Grid justifyContent= {is1100pxScreen ? "center" : "flex-start"} container xs ={is1100pxScreen ? 10 :  5}> {/*left lower panel*/}
					<Grid justifyContent= {is1100pxScreen ? "center" : "flex-start"} alignContent="flex-start" container xs = {6}> {/*Pick Subject*/}
						<Grid item>
							<Typography variant = "h6"> 1 - Disciplina </Typography>
						</Grid>
						<Grid justifyContent= {is1100pxScreen ? "center" : "flex-start"} container>
							<Select
							 IconComponent={ArrowDropDownRoundedIcon}
							 onChange={handleChangeSubject}
							 id="grouped-select"
							 defaultValue={subject}
							 classes={{ root: classes.selectRoot }}
							 className={classes.select} 
							 MenuProps = {{classes:{paper:classes.paper}}}
							 inputProps = {{classes:{icon:classes.icon}}}
							 disableUnderline>
								<MenuItem  classes={{ selected: classes.selected, root: classes.rootMenuItem }}  value={-1}> <em>Nenhuma</em></MenuItem>
								<ListSubheader className={classes.subheader}> <Typography>Ciências e Tecnologias</Typography></ListSubheader>
									<MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem }} value={0}> <Typography variant = "h6">Matemática A</Typography></MenuItem>
									<MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem }} value={1}> <Typography variant = "h6">Física e Química</Typography></MenuItem>
								
								<ListSubheader className={classes.subheader}> <Typography>Línguas e Humanidades</Typography></ListSubheader>
									<MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem }}> <Typography variant = "h6">História A</Typography></MenuItem>
							</Select>
						</Grid>
					</Grid> 

					<Grid container xs = {is1100pxScreen ? 12 : 6}> {/* Pick year*/}
						<Grid item>
							<Typography variant = "h6"> 2 - Ano(s) </Typography>
						</Grid>	
						{subject === -1
						?
						<Grid alignItems = "flex-start" container xs = {12}>
							<Grid item xs = {12}>
								<Box style={{ backgroundColor : '#D8D8D8', height : '120px'}} className={classes.boxes}></Box>
							</Grid>
						</Grid>
						:
						<Grid justifyContent= {is1100pxScreen ? "center" : "center"} container>
							<FormControl className={classes.boxes}>
								<FormGroup >
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={options.randomGrade} onChange={handleChangeRandomGrade} name="randomGrade"/>} label={<Typography variant = "h6">Aleatório</Typography>}/>
									{config.subjects[subject].years.map((year) =>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictYears[year]} onChange={handleChangeYear} name={`${year}`}/>} label={<Typography variant = "h6">{String(year) + "º"}</Typography>}/>
									)}
								</FormGroup>
							</FormControl>
						</Grid>
						}
					</Grid> 

					<Grid justifyContent= {is1100pxScreen ? "center" : "flex-start"} container xs ={12}> {/*Pick Themes*/}
						<Grid item>
							<Typography variant = "h6"> 3 - Tópicos </Typography>
						</Grid>
						{subject === -1
						?
						<Grid alignItems = "flex-start" container xs = {12}>
							<Grid item xs = {12}>
								<Box style={{ backgroundColor : '#D8D8D8', height : '120px'}} className={classes.boxes}></Box>
							</Grid>
						</Grid>
						: 
						<Grid justifyContent= {is1100pxScreen ? "center" : "flex-start"} container>
							<FormControl className={classes.boxes}>
								<FormGroup >
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={options.randomSubSubject} onChange={handleChangeRandomSubSubject} name="randomSubSubject"/>} label={<Typography variant = "h6">Aleatório</Typography>}/>
									{config.subjects[subject].themes.map((theme) => 
										<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictSubSubjects[theme]}  onChange={handleChangeSubSubjects} name={`${theme}`}/>} label={<Typography variant = "h6">{theme}</Typography>}/>
									)}
								</FormGroup>
							</FormControl>
						</Grid>
						}
					</Grid> 

					<Grid justifyContent="center" container > {/*Começar Button*/}
						<Grid className={classes.button} item>
							<NormalButton  fontSize={28} text="Começar" onClick={handleClick}/>
						</Grid>
						
					</Grid>
				</Grid>

				{is1100pxScreen 

				? 
					<Grid container xs={12}  direction="column" justifyContent="center" alignItems="center">
							<Grid container xs = {12}>
								<Divider orientation= "horizontal" className={classes.divider} flexItem /> {/*Vertical Divider*/}
							</Grid>
							<Grid item xs = {12}>
								<Typography variant="h6">ou</Typography> {/*Maybe put this in Bold */}
							</Grid>
							<Grid item xs = {12}>
								<Typography className={classes.upperSideText} variant="h5">Deixa isso connosco</Typography>
							</Grid>
						</Grid>
				: 

					<Grid justifyContent="center" container xs = {1}>
						<Divider orientation= "vertical" className={classes.divider} flexItem /> {/*Vertical Divider*/}
					</Grid>
				}
	
				<Grid container xs = {is1100pxScreen ? 12 : 5}> {/*right lower panel*/}
					<Grid item>
						<Typography variant = "h6">Aqui ficamos responsáveis por gerar o <span style={{color: theme.palette.secondary.main}}>melhor exame para ti</span>, tendo em conta as tuas últimas performances.</Typography> {/* Best way to change a specific attribute in a string */}
					</Grid>
					<Grid container justifyContent="center">
					<List className={classes.list} subheader={<li />}>
						{config.subjects.map((subject) => (
						<ListItem  className = {classes.listItem}>
							<ListItemText  primary={ <Typography variant="h6"> {subject.name}</Typography>} />
							<ListItemIcon>
							<IconButton onClick={() =>handleClickCustom(subject)}  edge="end" aria-label="comments">
								<RedRoundArrow />
							</IconButton>
							</ListItemIcon>
						</ListItem>
						))}
					</List>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
} 

export default GenExamPage;