import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/';
import theme from '../globalTheme';
import IconButton from '../components/buttons/IconButton';
import AbcIcon from '@mui/icons-material/Abc';

const useStyles = makeStyles(() => ({
	paper: {
		width: '100%',
		height: '80vh',
		borderRadius: 40,
		border: '3px solid #D9D9D9',
		boxShadow: '-6px 4px 6px rgba(0, 0, 0, 0.25)',
	},
	container: {
		width: '100%',
		height: '100%',
		padding: '3rem',
	},
	icon: {
		fontSize: 100,
	},
}));

export const HomePage = () => {
	const classes = useStyles();
	const icon = <AbcIcon className={classes.icon} />;

	return (
		<Paper theme={theme} className={classes.paper}>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='flex-start'
				className={classes.container}
				spacing={4}
			>
				<Grid item xs='auto'>
					<Typography>text</Typography>
				</Grid>

				{/* Home Buttons */}
				<Grid item xs='auto'>
					<Grid
						spacing={4}
						container
						direction='row'
						justifyContent='flex-start'
						alignItems='center'
					>
						<Grid item xs={4}>
							<IconButton
								direction='column'
								fontSize={25}
								text='Entrar'
								onClick={null}
								iconFirst={false}
							>
								{icon}
							</IconButton>
						</Grid>
						<Grid item xs={4}>
							<IconButton
								direction='column'
								fontSize={25}
								text='Entrar'
								onClick={null}
								iconFirst={false}
							>
								{icon}
							</IconButton>
						</Grid>
						<Grid item xs={4}>
							<IconButton
								direction='column'
								fontSize={25}
								text='Entrar'
								onClick={null}
								iconFirst={false}
							>
								{icon}
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs='auto'>
					<Typography>text</Typography>
				</Grid>

				<Grid item xs='auto'>
					<Typography>text</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};
