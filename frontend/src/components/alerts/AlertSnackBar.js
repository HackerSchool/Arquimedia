import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

function AlertSnackBar(props) {
	const [internalOpen, setInternalOpen] = useState(true);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setInternalOpen(false);
	};

	return (
		<Snackbar
			anchorOrigin={props.anchorOrigin}
			open={props.open && internalOpen}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<MuiAlert onClose={handleClose} severity={props.type}>
				{props.text}
			</MuiAlert>
		</Snackbar>
	);
}

export default AlertSnackBar;
