import React from 'react';
import { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton,
	Collapse,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ReactComponent as DeleteReport } from '../../assets/deleteComment.svg';
import { deleteReport } from '../../api';

const Report = (props) => {
	const [expand, setExpand] = useState(false);
	const row = props.data;
	function handleReportDelete(id) {
		deleteReport(id, () => {
			props.afterReportDeleted(id);
		});
	}

	return (
		<>
			{' '}
			<TableRow hover tabIndex={-1} key={row.id}>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setExpand(!expand)}
					>
						{expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell
					component='th'
					id={props.labelId}
					scope='row'
					padding='none'
					align='left'
				>
					{row.id}
				</TableCell>
				<TableCell align='left'>{row.question}</TableCell>
				<TableCell align='left'>{row.type}</TableCell>
				<TableCell align='left'>{row.body}</TableCell>
			</TableRow>
			<TableRow>
				{' '}
				{/* Expandable */}
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
					<Collapse in={expand} timeout='auto' unmountOnExit>
						<Table size='small' aria-label='purchases'>
							<TableHead>
								<TableRow>
									<TableCell>Autor</TableCell>
									<TableCell>Data</TableCell>
									<TableCell>Acções</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>{row.author}</TableCell>
									<TableCell>{row.date}</TableCell>
									<TableCell>
										<IconButton onClick={() => handleReportDelete(row.id)}>
											<DeleteReport />
										</IconButton>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default Report;
