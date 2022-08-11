import React from 'react';
import { useState, useEffect } from 'react';
import {
	Toolbar,
	Typography,
	IconButton,
	Tooltip,
	Select,
	MenuItem,
	TextField,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import isUnique from '../../utils/isUnique';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import globalTheme from '../../globalTheme';

export default function ReportTableToolbar(props) {
	const [reportIDs, setReportIDs] = useState([]);
	const [questionIDs, setQuestionIDs] = useState([]);
	const [types, setTypes] = useState([]);
	const [reportID, setReportID] = useState('none');
	const [questionID, setQuestionID] = useState('none');
	const [chosenType, setChosenType] = useState('none');
	const [bodyQuery, setBodyQuery] = useState('');
	const [filtering, setFiltering] = useState(false);

	useEffect(() => {
		var reportIDs = props.rows.map((row) => row['id']);
		var uniqueReportIDs = reportIDs.filter(isUnique);
		setReportIDs(uniqueReportIDs);

		var questionIDs = props.rows.map((row) => row['question']);
		var uniqueQuestionIDs = questionIDs.filter(isUnique);
		setQuestionIDs(uniqueQuestionIDs);

		var types = props.rows.map((row) => row['type']);
		var uniqueTypes = types.filter(isUnique);
		setTypes(uniqueTypes);
	}, []);

	const handleReportIDChange = (event) => {
		setReportID(event.target.value);
	};

	const handleQuestionIDChange = (event) => {
		setQuestionID(event.target.value);
	};

	const handleErrorTypeChange = (event) => {
		setChosenType(event.target.value);
	};

	const handleBodyQueryChange = (event) => {
		setBodyQuery(event.target.value);
	};

	const search = () => {
		props.searchFunction(reportID, questionID, chosenType, bodyQuery);
		setBodyQuery('');
	};

	const resetFilters = () => {
		setReportID('none');
		setQuestionID('none');
		setChosenType('none');
		setBodyQuery('');
		props.resetFilters();
	};
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>
			<Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
				Reports
			</Typography>

			{filtering ? (
				<>
					{' '}
					<Select
						labelId='ReportID'
						id='ReportID'
						value={reportID}
						onChange={handleReportIDChange}
						sx={globalTheme.components.select.styleOverrides}
						MenuProps={{
							sx: globalTheme.components.menuItem.styleOverrides,
						}}
					>
						<MenuItem value={'none'}>Todos os ReportIDs</MenuItem>
						{reportIDs.map((id, index) => (
							<MenuItem value={id} key={index}>
								{id}
							</MenuItem>
						))}
					</Select>
					<Select
						labelId='QuestionID'
						id='QuestionID'
						value={questionID}
						onChange={handleQuestionIDChange}
						style={{ margin: '1rem' }}
						sx={globalTheme.components.select.styleOverrides}
						MenuProps={{
							sx: globalTheme.components.menuItem.styleOverrides,
						}}
					>
						<MenuItem value={'none'}>Todos as questões</MenuItem>
						{questionIDs.map((questionID, index) => (
							<MenuItem value={questionID} key={index}>
								{questionID}
							</MenuItem>
						))}
					</Select>
					<Select
						labelId='errorType'
						id='errorType'
						value={chosenType}
						onChange={handleErrorTypeChange}
						sx={globalTheme.components.select.styleOverrides}
						MenuProps={{
							sx: globalTheme.components.menuItem.styleOverrides,
						}}
					>
						<MenuItem value={'none'}>Filtre por tipo de erro</MenuItem>
						{types.map((type, index) => (
							<MenuItem value={type} key={index}>
								{type}
							</MenuItem>
						))}
					</Select>
					<TextField
						style={{ margin: '1rem' }}
						variant='standard'
						fullWidth
						value={bodyQuery}
						name='bodyQuery'
						placeholder='Pesquise por descrição....'
						label=''
						onChange={handleBodyQueryChange}
						InputProps={{
							disableUnderline: true,
						}}
					/>
					<Tooltip title='Search'>
						<IconButton onClick={search}>
							<SearchIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title='Reset Filters'>
						<IconButton onClick={resetFilters}>
							<RefreshIcon />
						</IconButton>
					</Tooltip>
				</>
			) : null}
			{filtering ? (
				<Tooltip title='Close filters tab'>
					<IconButton onClick={() => setFiltering(!filtering)}>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title='Open filters tab'>
					<IconButton onClick={() => setFiltering(!filtering)}>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}
