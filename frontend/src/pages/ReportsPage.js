import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Typography,
	Paper,
	IconButton,
	Tooltip,
	Select,
	MenuItem,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { getReports } from '../api';
import Loading from '../components/loading/Loading';
import Report from '../components/report/Report';
import isUnique from '../utils/isUnique';

function descendingComparator(a, b, orderBy) {
	// We assume that values are descending
	if (Number(b[orderBy]) < Number(a[orderBy])) {
		// B<A logo A vai aparecer primeiro que B
		return -1;
	}
	if (Number(b[orderBy]) > Number(a[orderBy])) {
		// B>A logo B vai aparecer primeiro que A
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	// Changes the Signal of the comparator function, depending on if we want and ascending or descending relationship, default is the latter
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]); //Stores each object and it's index prior to sorting
	stabilizedThis.sort((a, b) => {
		//Sorts according to a comparator Function (if it returns value > 0 sort A after B) (if it returns value < 0 sort B after A)
		//(If they are the same, the old indexes decide, and the same sorting is mantained for that case)
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
	//Eliminates old index, makes it only one element again, only store the first element of the array which is the initial object
}

const headCells = [
	{
		id: 'id',
		rightAlligned: false,
		disablePadding: true,
		label: 'ReportID',
	},
	{
		id: 'question',
		rightAlligned: false,
		disablePadding: false,
		label: 'Questão',
	},
	{
		id: 'type',
		rightAlligned: false,
		disablePadding: false,
		label: 'Tipo',
	},
	{
		id: 'body',
		rightAlligned: false,
		disablePadding: false,
		label: 'Descrição',
	},
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell />
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.rightAlligned ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						{headCell.id === 'body' || headCell.id === 'type' ? (
							headCell.label
						) : (
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={
									headCell.id === 'body' ? null : createSortHandler(headCell.id)
								}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component='span' sx={visuallyHidden}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
};

const EnhancedTableToolbar = (props) => {
	const [types, setTypes] = useState([]);
	const [chosenType, setChosenType] = useState('none');

	useEffect(() => {
		var types = props.rows.map((row) => row['type']);
		var uniqueTypes = types.filter(isUnique);
		setTypes(uniqueTypes);
	}, []);

	const handleErrorTypeChange = (event) => {
		setChosenType(event.target.value);
		props.onErrorTypeChange(event.target.value);
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
			<Select
				labelId='errorType'
				id='errorType'
				value={chosenType}
				onChange={handleErrorTypeChange}
				disableUnderline
			>
				{types.map((type, index) => (
					<MenuItem value={type} key={index}>
						{type}
					</MenuItem>
				))}
				<MenuItem value={'none'}>Filter by Error Type</MenuItem>
			</Select>

			<Tooltip title='Filter list'>
				<IconButton>
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
};

const ReportsPage = () => {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id');
	const [page, setPage] = useState(0);
	const [rows, setRows] = useState(null);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [loading, setLoading] = useState(true);
	const [originalRows, setOriginalRows] = useState([]);

	useEffect(() => {
		getReports((res) => {
			setOriginalRows(res.data);
			setRows(res.data);
			setLoading(false);
		});
	}, []);
	const afterReportDeleted = (id) => {
		const reports = rows.filter((report) => report.id !== id);
		setRows(reports); //Update List
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		//We ought to know if the event is happening on the same property, if so the order will be inversed
		setOrder(isAsc ? 'desc' : 'asc'); //if it was previously ascending in the same porperty we now change for descending
		setOrderBy(property);
		console.log(originalRows);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const filterErrorType = (type) => {
		if (type === 'none' && rows !== originalRows) {
			setRows(originalRows);
		} else {
			var reports = originalRows;
			var newReports = reports.filter((value) => value['type'] === type);
			setRows(newReports);
		}
	};

	if (loading) return <Loading />;

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar rows={rows} onErrorTypeChange={filterErrorType} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<colgroup>
							<col style={{ width: '2%' }} />
							<col style={{ width: '2%' }} />
							<col style={{ width: '2%' }} />
							<col style={{ width: '15%' }} />
							<col style={{ width: '79%' }} />
						</colgroup>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //What objects will be shown
								.map((row, index) => {
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<Report
											data={row}
											labelId={labelId}
											key={row.id}
											afterReportDeleted={afterReportDeleted}
										/>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
};
export default ReportsPage;
