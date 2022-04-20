import React, { useState } from "react";
import {
	Typography,
	Grid,
	Divider,
	Select,
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
	MenuItem,
	ListSubheader,
	List,
	ListItemText,
	ListItem,
	ListItemIcon,
	IconButton,
	useMediaQuery
} from '@mui/material';
import { createExam } from "../api";
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import AlertSnackBar from "../components/alerts/AlertSnackBar";
import NormalButton from "../components/buttons/NormalButton";
import { ReactComponent as RedRoundCheckmark } from "../assets/redroundcheck.svg";
import { ReactComponent as GreyRoundCheckbox } from "../assets/redroundcheckbg.svg";
import { ReactComponent as RedRoundArrow } from "../assets/redroundarrow.svg";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useSnackbar } from 'notistack';

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

	const { enqueueSnackbar } = useSnackbar();

	const [subject, setSubject] = useState("none")

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

	let redString = 'Aqui ficamos responsáveis por gerar o melhor exame para ti, tendo em conta as tuas últimas performances.'
	redString = redString.replace('melhor exame para ti,', match => `<Typography style="color: red">${match} </Typography>` )

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
		if (subject === "none") {
			enqueueSnackbar("Por favor selecione uma disciplina antes de começar", {variant: "warning"})
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

	
	const handleClickCustom = (index1,index2) => { //Function for the perosnalised Exam experience of the right Panel
		
		const key = courseArray[index1].subjectsKey[index2]
		setSubject(key) 

		if (key === "none") {
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

				subject: subject,
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
								<MenuItem  classes={{ selected: classes.selected, root: classes.rootMenuItem }}  value="none"> <em>Nenhuma</em></MenuItem>
								<ListSubheader className={classes.subheader}> <Typography>Ciências e Tecnologias</Typography></ListSubheader>
									<MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem }} value={"math"}> <Typography variant = "h6">Matemática A</Typography></MenuItem>
									<MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem }} value={"physics"}> <Typography variant = "h6">Física e Química</Typography></MenuItem>
								
								<ListSubheader className={classes.subheader}> <Typography>Línguas e Humanidades</Typography></ListSubheader>
									<MenuItem classes={{ selected: classes.selected, root: classes.rootMenuItem }}> <Typography variant = "h6">História A</Typography></MenuItem>
							</Select>
						</Grid>
					</Grid> 

					<Grid justifyContent="center" container xs = {is1100pxScreen ? 12 : 6}> {/* Pick year*/}
						<Grid item>
							<Typography variant = "h6"> 2 - Ano(s) </Typography>
						</Grid>	
						<Grid justifyContent= {is1100pxScreen ? "center" : "center"} container>
							<FormControl className={classes.boxes}>
								<FormGroup >
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={options.randomGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeRandomGrade} name="randomGrade"/>} label={<Typography variant = "h6">Aleatório</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictYears.tenthGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeYear} name="tenthGrade"/>} label={<Typography variant = "h6">10º</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictYears.eleventhGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeYear} name="eleventhGrade"/>} label={<Typography variant = "h6">11º</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictYears.twelfthGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeYear} name="twelfthGrade"/>} label={<Typography variant = "h6">12º</Typography>}/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid> 

					<Grid justifyContent= {is1100pxScreen ? "center" : "flex-start"} container xs ={12}> {/*Pick Themes*/}
						<Grid item>
							<Typography variant = "h6"> 3 - Tópicos </Typography>
						</Grid>
						<Grid justifyContent= {is1100pxScreen ? "center" : "flex-start"} container>
							<FormControl className={classes.boxes}>
								<FormGroup >
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeRandomSubSubject} name="randomSubSubject"/>} label={<Typography variant = "h6">Aleatório</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictSubSubjects.geometry && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>}  onChange={handleChangeSubSubjects} name="geometry"/>} label={<Typography variant = "h6">Geometria</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictSubSubjects.imaginary && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeSubSubjects} name="imaginary"/>} label={<Typography variant = "h6">Imaginários</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictSubSubjects.statistics && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeSubSubjects} name="statistics"/>} label={<Typography variant = "h6">Estatística</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictSubSubjects.probability && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeSubSubjects} name="probability"/>} label={<Typography variant = "h6">Probabilidades</Typography>}/>
								</FormGroup>
							</FormControl>
						</Grid>
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
						<Typography variant = "h6" dangerouslySetInnerHTML={{__html: redString}}></Typography> {/* Best way to change a specific attribute in a string */}
					</Grid>
					<Grid container justifyContent="center">
					<List className={classes.list} subheader={<li />}>
					{courseArray.map((courseDict,index1) => (
						<li key={`${courseDict.name}`} className={classes.listSection}>
						<ul className={classes.ul}>
							<ListSubheader>{<Typography >{courseDict.name}</Typography>}</ListSubheader>
							{courseDict.subjects.map((subjectName, index2) => (
							<ListItem  className = {classes.listItem} key={`${courseDict.name}-${subjectName}`}>
								<ListItemText  primary={ <Typography variant="h6"> {subjectName}</Typography>} />
								<ListItemIcon>
								<IconButton onClick={() =>handleClickCustom(index1, index2)}  edge="end" aria-label="comments">
									<RedRoundArrow />
								</IconButton>
								</ListItemIcon>
							</ListItem>
							))}
						</ul>
						</li>
					))}
					</List>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
} 

export default GenExamPage;