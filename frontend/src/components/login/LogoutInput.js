import { Grid, Button } from '@mui/material';
import { logOut } from '../../api';
import React, { useState } from 'react';

const LogoutInput = () => {
	const handleClick = () => {
		logOut();
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Button variant='contained' type='submit' onClick={handleClick}>
					Confirmar Saída?
				</Button>
			</Grid>
		</Grid>
	);
};

export default LogoutInput;
