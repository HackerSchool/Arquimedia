import React from 'react';
import PropTypes from 'prop-types';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { visuallyHidden } from '@mui/utils';

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
		id: 'author',
		rightAlligned: false,
		disablePadding: false,
		label: 'Autor',
	},
	{
		id: 'date',
		rightAlligned: false,
		disablePadding: false,
		label: 'Data',
	},
	{
		id: 'action',
		rightAlligned: false,
		disablePadding: false,
		label: 'Ações',
	},
];

export default function EnhancedTableHead(props) {
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
