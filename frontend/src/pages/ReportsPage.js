import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableContainer, TablePagination, Paper } from '@mui/material';
import { getReports } from '../api';
import Loading from '../components/loading/Loading';
import Report from '../components/report/Report';
import ReportTableHead from '../components/report/ReportTableHead';
import ReportTableToolbar from '../components/report/ReportTableToolbar';

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
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const search = (reportID, questionID, chosenType, bodyQuery) => {
		var reports = originalRows;
		if (reportID !== 'none') {
			//The journey ends here
			reports = reports.filter((report) => reportID === report['id']);
		} else {
			if (questionID !== 'none') {
				reports = reports.filter((report) => questionID === report['question']);
			}
			if (chosenType !== 'none') {
				reports = reports.filter((report) => chosenType === report['type']);
			}
			if (bodyQuery.length > 0) {
				reports = reports
					.filter((report) => report['body']) //filter only rows with a body !== null
					.filter((report) => {
						return report['body'].toLowerCase().includes(bodyQuery.toLowerCase());
					}); //Search is case insentive
			}
		}

		setRows(reports);
	};
	const resetRows = () => {
		setRows(originalRows);
	};

	if (loading) return <Loading />;

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<ReportTableToolbar rows={rows} searchFunction={search} resetFilters={resetRows} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<colgroup>
							<col style={{ width: '5%' }} />
							<col style={{ width: '5%' }} />
							<col style={{ width: '5%' }} />
							<col style={{ width: '15%' }} />
							<col style={{ width: '25%' }} />
							<col style={{ width: '25%' }} />
							<col style={{ width: '10%' }} />
						</colgroup>
						<ReportTableHead
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
									const labelId = `report-table-checkbox-${index}`;

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
