import React, { useState } from 'react';
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
	ListItemButton,
	useMediaQuery,
} from '@mui/material';
import { createExam, createRecommendedExam } from '../api';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import NormalButton from '../components/buttons/NormalButton';
import { ReactComponent as RedRoundArrow } from '../assets/redroundarrow.svg';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useSnackbar } from 'notistack';
import { Checkbox } from '../components/checkbox/Checkbox';
import config from '../config';
import globalTheme from '../globalTheme';

const useStyles = makeStyles((theme) => ({
	body: {},
	lowerPanel: {
		margin: '25px 0px',
	},
	divider: {
		height: 'calc(85%)',
	},
	ou: {
		margin: '0px -13px',
	},
	upperSideText: {
		color: theme.palette.secondary.main,
		[theme.breakpoints.down(1100)]: {
			margin: '30px 0px',
		},
	},
	boxes: {
		backgroundColor: theme.palette.background.default,
		border: '2px solid #D9D9D9',
		borderRadius: '10px',
		padding: '10px',
		color: theme.palette.text.primary,
		boxShadow: '-2px 2px 2px #D9D9D9',
	},
	select: {
		//change select css, events and whatnot
		backgroundColor: 'inherit',
		border: '2px solid #D9D9D9',
		borderRadius: '10px',
		color: theme.palette.text.primary,
		minHeight: '70px',
		minWidth: 'calc(70%)',
		maxWidth: 150,
		padding: '5px',
		boxShadow: '-2px 2px 2px #D9D9D9',
	},
	selectRoot: {
		'&:focus': {
			backgroundColor: theme.palette.background.default,
		},
	},
	paper: {
		background: theme.palette.background.default,
		color: theme.palette.text.primary,
	},
	subheader: {
		color: 'grey',
	},
	icon: {
		fill: theme.palette.text.primary,
		margin: '0px 7px',
	},
	rootMenuItem: {
		'&$selected': {
			backgroundColor: theme.palette.grey.primary,
			'&:hover': {
				backgroundColor: theme.palette.background.default,
			},
		},
		'&:hover': {
			backgroundColor: '#F6F6F6',
		},
	},
	list: {
		backgroundColor: theme.palette.background.default,
		overflow: 'auto',
		maxHeight: 300,
		'&::-webkit-scrollbar': {
			width: '0.7em',
		},
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
			webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#C4C4C4',
			borderRadius: '50px',
		},
	},
	listSection: {
		backgroundColor: 'inherit',
		color: 'inherit',
		padding: 30,
	},
	ul: {
		padding: 0,
		backgroundColor: 'inherit',
		color: 'inherit',
	},
	listItem: {
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		border: '2px solid #D9D9D9',
		borderRadius: '10px',
		margin: '30px 0px',
		padding: 7,
		boxShadow: '-2px 2px 2px #D9D9D9',
	},
	rightArrow: {
		color: 'EB5757',
	},
	button: {
		margin: ' 30px 15px',
	},
}));

const GenExamPage = () => {
	const classes = useStyles();

	const theme = useTheme();

	const is1100pxScreen = useMediaQuery(theme.breakpoints.down(1100));

	const [dictSubSubjects, setDictSubSubjects] = useState(
		config.subjects[0].themes.reduce((o, key) => ({ ...o, [key]: false }), {})
	);

	const baseSubSubjects = dictSubSubjects;

	const [dictYears, setDictYear] = useState({
		10: false,
		11: false,
		12: false,
	});

	const baseYears = {};

	const [options, setOptions] = useState({
		randomSubSubject: true,
		randomGrade: true,
	});

	const { enqueueSnackbar } = useSnackbar();

	const [subject, setSubject] = useState(config.subjects[0].name);

	const resetDictYear = () => {
		setDictYear(baseYears);
	};

	const resetDictSubSubjects = () => {
		const newThemes = Object.fromEntries(
			// eslint-disable-next-line no-unused-vars
			Object.entries(dictSubSubjects).map(([k, v], i) => {
				return [k, false];
			})
		);
		setDictSubSubjects(newThemes);
	};

	const handleChangeYear = (event) => {
		if (options.randomGrade) setOptions({ ...options, randomGrade: false });
		setDictYear({ ...dictYears, [event.target.name]: event.target.checked });
	};

	const handleChangeSubSubjects = (event) => {
		if (options.randomSubSubject) setOptions({ ...options, randomSubSubject: false });
		setDictSubSubjects({ ...dictSubSubjects, [event.target.name]: event.target.checked });
	};

	const handleChangeRandomSubSubject = (event) => {
		if (!options.randomSubSubject) {
			resetDictSubSubjects();
		}
		setOptions({ ...options, [event.target.name]: event.target.checked });
	};

	const handleChangeRandomGrade = (event) => {
		setOptions({ ...options, [event.target.name]: event.target.checked });

		if (!options.randomGrade) {
			resetDictYear();
		}
	};

	const handleChangeSubject = (event) => {
		setSubject(event.target.value);

		const subject = config.subjects.find((el) => el.name === event.target.value);

		subject.years.forEach((year) => (baseYears[year] = false));
		subject.themes.forEach((theme) => {
			baseSubSubjects[theme] = false;
		});

		setOptions({
			randomSubSubject: true,
			randomGrade: true,
		});

		setDictYear(baseYears);
		setDictSubSubjects(baseSubSubjects);
	};

	const handleClick = () => {
		let subSubjects = [];

		for (const [key, value] of Object.entries(dictSubSubjects)) {
			if (value) subSubjects.push(key);
		}

		let year = [];

		for (const [key, value] of Object.entries(dictYears)) {
			if (value) year.push(key);
		}

		createExam(
			{
				subject: subject,
				randomSubSubject: options.randomSubSubject,
				subSubjects: subSubjects,
				year: year.map((year) => parseInt(year)),
			},
			(res) => {
				window.location.href = '/exame/' + res.data.id;
			},
			(error) => {
				if (error.response.data.error === 'Not enough questions')
					enqueueSnackbar(
						'Desculpa, não temos perguntas suficientes para essa combinação.',
						{ variant: 'warning' }
					);
				else enqueueSnackbar('Algo correu mal...', { variant: 'error' });
			}
		);
	};

	const handleClickRecommended = (subject) => {
		// Creates a recommended exam that fits the user
		createRecommendedExam(
			{
				subject: subject.name,
			},
			(res) => {
				window.location.href = '/exame/' + res.data.id;
			},
			() => enqueueSnackbar('Algo correu mal...', { variant: 'error' })
		);
	};

	return (
		<Grid container direction='row' justifyContent='center' alignItems='center'>
			<Grid container xs={10} direction={is1100pxScreen ? 'column' : 'row'}>
				<Grid item container xs md direction='row'>
					<Grid item textAlign='center' xs={12}>
						<Typography
							style={{ marginBottom: '2rem' }}
							className={classes.upperSideText}
							variant='h4'
						>
							Personaliza o teu exame
						</Typography>
					</Grid>

					<Grid container direction='column' xs={is1100pxScreen ? 12 : 6}>
						{' '}
						{/*Pick Subject*/}
						<Grid textAlign={is1100pxScreen && 'center'} item>
							<Typography variant='h6'> 1 - Disciplina </Typography>
						</Grid>
						<Grid justifyContent={is1100pxScreen ? 'center' : 'flex-start'} container>
							<Select
								style={{ margin: is1100pxScreen && '20px 0px' }}
								IconComponent={ArrowDropDownRoundedIcon}
								onChange={handleChangeSubject}
								id='grouped-select'
								value={subject}
								classes={{ root: classes.selectRoot }}
								className={classes.select}
								sx={globalTheme.components.select.styleOverrides}
								MenuProps={{
								sx: globalTheme.components.menuItem.styleOverrides,
								classes: { paper: classes.paper },
								}}
								inputProps={{ classes: { icon: classes.icon } }}
							>
								{config.areas.map((area) => [
									<ListSubheader key={area} className={classes.subheader}>
										{' '}
										<Typography>{area}</Typography>
									</ListSubheader>,
									config.subjects
										.filter((el) => el.area === area)
										.map((el) => (
											<MenuItem
												key={el.name}
												disabled={!el.active}
												classes={{
													selected: classes.selected,
													root: classes.rootMenuItem,
												}}
												value={el.name}
											>
												{' '}
												<Typography variant='h6'>{el.name}</Typography>
											</MenuItem>
										)),
								])}
							</Select>
						</Grid>
					</Grid>

					<Grid container direction='column' xs={is1100pxScreen ? 12 : 6}>
						{' '}
						{/* Pick year*/}
						<Grid textAlign={is1100pxScreen && 'center'} item>
							<Typography variant='h6'> 2 - Ano(s) </Typography>
						</Grid>
						<Grid justifyContent={is1100pxScreen ? 'center' : 'flex-start'} container>
							<FormControl
								style={{ margin: is1100pxScreen && '20px 0px' }}
								className={classes.boxes}
							>
								<FormGroup>
									<FormControlLabel
										labelPlacement='start'
										control={
											<Checkbox
												checked={options.randomGrade}
												onChange={handleChangeRandomGrade}
												name='randomGrade'
											/>
										}
										label={<Typography variant='h6'>Aleatório</Typography>}
									/>
									{config.subjects
										.find((el) => el.name === subject)
										.years.map((year) => (
											<FormControlLabel
												key={year}
												labelPlacement='start'
												control={
													<Checkbox
														checked={dictYears[year]}
														onChange={handleChangeYear}
														name={`${year}`}
													/>
												}
												label={
													<Typography variant='h6'>
														{String(year) + 'º'}
													</Typography>
												}
											/>
										))}
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>

					<Grid direction='column' xs={is1100pxScreen ? 12 : true} container>
						{' '}
						{/*Pick Themes*/}
						<Grid textAlign={is1100pxScreen && 'center'} item>
							<Typography variant='h6'> 3 - Tópicos </Typography>
						</Grid>
						<Grid justifyContent={is1100pxScreen ? 'center' : 'flex-start'} container>
							<FormControl
								style={{ margin: is1100pxScreen && '20px 0px' }}
								className={classes.boxes}
							>
								<FormGroup>
									<FormControlLabel
										labelPlacement='start'
										control={
											<Checkbox
												checked={options.randomSubSubject}
												onChange={handleChangeRandomSubSubject}
												name='randomSubSubject'
											/>
										}
										label={<Typography variant='h6'>Aleatório</Typography>}
									/>
									{config.subjects
										.find((el) => el.name === subject)
										.themes.map((theme) => (
											<FormControlLabel
												key={theme}
												labelPlacement='start'
												control={
													<Checkbox
														checked={dictSubSubjects[theme]}
														onChange={handleChangeSubSubjects}
														name={`${theme}`}
													/>
												}
												label={
													<Typography variant='h6'>{theme}</Typography>
												}
											/>
										))}
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>

					<Grid justifyContent='center' container xs={12}>
						{' '}
						{/*Começar Button*/}
						<Grid className={classes.button} item>
							<NormalButton fontSize={28} text='Começar' onClick={handleClick} />
						</Grid>
					</Grid>
				</Grid>

				<Divider orientation={is1100pxScreen ? 'horizontal' : 'vertical'} flexItem>
					<Typography textAlign='center' variant='h6'>
						ou
					</Typography>
				</Divider>

				<Grid item container direction='column' xs md spacing={4}>
					<Grid item textAlign='center'>
						<Typography className={classes.upperSideText} variant='h4'>
							Deixa isso connosco
						</Typography>
					</Grid>
					<Grid item>
						<Typography style={{ marginLeft: '4rem' }} variant='h6'>
							Aqui ficamos responsáveis por gerar o{' '}
							<span style={{ color: theme.palette.secondary.main }}>
								melhor exame para ti
							</span>
							, tendo em conta as tuas últimas performances.
						</Typography>{' '}
						{/* Best way to change a specific attribute in a string */}
					</Grid>
					<Grid container justifyContent='center'>
						<List className={classes.list} subheader={<li />}>
							{config.subjects
								.filter((subject) => subject.active)
								.map((subject) => (
									<ListItem key={subject.name} className={classes.listItem}>
										<ListItemButton
											onClick={() => handleClickRecommended(subject)}
										>
											<ListItemText
												primary={
													<Typography variant='h6'>
														{subject.name}
													</Typography>
												}
											/>
											<ListItemIcon style={{ marginLeft: '2rem' }}>
												<RedRoundArrow />
											</ListItemIcon>
										</ListItemButton>
									</ListItem>
								))}
						</List>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default GenExamPage;
