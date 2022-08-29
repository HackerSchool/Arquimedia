import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	DialogTitle,
	Dialog,
	IconButton,
	DialogContent,
	Grid,
	Typography,
	Button,
	TextField,
} from '@mui/material';
import theme from '../../globalTheme';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as TextBubbleIcon } from '../../assets/textBubbleIcon.svg';
import { ReactComponent as SubmissionIcon } from '../../assets/submissionIcon.svg';
import { ReactComponent as DesformatIcon } from '../../assets/desformatIcon.svg';
import { ReactComponent as LoadingIcon } from '../../assets/loadingIcon.svg';
import { ReactComponent as ImageIcon } from '../../assets/imageIcon.svg';
import { ReactComponent as OtherIcon } from '../../assets/otherIcon.svg';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveWidth from '../../hooks/responsiveWidth';
import NormalButton from '../buttons/NormalButton';
import Box from '../box/Box';

const reportData = [
	{
		icon: <TextBubbleIcon />,
		text: 'Enunciado/Opções incorrectas',
		type: 'Typo',
	},
	{ icon: <SubmissionIcon />, text: 'Erro na submissão', type: 'SubmissionError' },
	{ icon: <DesformatIcon />, text: 'Pergunta desformatada', type: 'QuestionFormatting' },
	{ icon: <LoadingIcon />, text: 'A página não carrega', type: 'LoadingError' },
	{ icon: <ImageIcon />, text: 'Figura errada ou em falta', type: 'ImageError' },
	{ icon: <OtherIcon />, text: 'Outro...', type: 'Other' },
];

const useStyles = makeStyles(() => ({
	reportText: {
		wordWrap: 'break-word',
		fontWeight: 'bold',
		flexWrap: 'nowrap',
		textTransform: 'none',
	},
	centerGrid: {
		padding: '2.5rem 0rem 0rem 3rem',
	},
	reportButton: {},
	paddingGrid: { padding: '3rem 0rem 0rem 0rem' },
}));

export default function ReportDialog(props) {
	const classes = useStyles();
	const [reportType, setReportType] = useState(null);
	const [otherDescription, setOtherDescription] = useState(null);

	const handleClose = () => {
		//In the end we Reset the reportType State and Discard The Information
		setReportType(null);
		setOtherDescription(null);
		props.onClose(null, null); // Since the state is only updated afterwards
	};

	const handleSubmission = () => {
		//In the end we Reset the reportType State and Submit the Information
		props.onClose(reportType, otherDescription);
		setReportType(null);
		setOtherDescription(null);
	};
	const handleOtherDescription = (e) => {
		setOtherDescription(e.target.value);
	};

	const windowArray = useWindowDimensions();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Dialog
			onClose={handleClose}
			open={props.open}
			fullScreen={fullScreen}
			maxWidth={'lg'}
			sx={{
				backdropFilter: 'blur(5px)',
			}}
			BackdropProps={{ style: { backgroundColor: 'transparent' } }}
			PaperProps={{
				style: {
					border: '2px solid',
					borderRadius: 20,
					borderColor: theme.palette.grey.primary,
					boxShadow: '-6px 7px 16px rgba(0, 0, 0, 0.25)',
					padding: '1rem',
				},
			}}
		>
			<DialogTitle>
				<Typography
					variant='h5'
					fontWeight='bold'
					color={theme.palette.secondary.main}
					style={{
						fontSize: responsiveWidth(windowArray, 20, 35, 0.017),
					}}
				>
					Reportar
				</Typography>
				{props.onClose ? (
					<IconButton
						aria-label='close'
						onClick={handleClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: grey,
						}}
					>
						<CloseIcon />
					</IconButton>
				) : null}
			</DialogTitle>
			<DialogContent>
				<Grid
					container
					direction='column'
					justifyContent='center'
					alignItems='center'
					className={classes.centerGrid}
				>
					<Grid
						container
						direction='row'
						justifyContent='center'
						alignItems='center'
						spacing={2}
					>
						{reportData.map((report) => (
							<Grid
								item
								container
								xs={4}
								justifyContent='flex-start'
								alignItems='center'
								key={report.type}
								style={{
									borderRadius: 20,
									backgroundColor: reportType === report.type && '#E5E5E5',
									boxShadow:
										reportType === report.type &&
										'-6px 7px 16px rgba(0, 0, 0, 0.25)',
									padding: '1rem',
								}}
							>
								<Button
									startIcon={report.icon}
									color='inherit'
									onClick={() => {
										setReportType(report.type);
									}}
								>
									<Typography
										variant='body1'
										className={classes.reportText}
										display='block'
										style={{
											fontSize: responsiveWidth(windowArray, 10, 23, 0.017),
										}}
									>
										{report.text}
									</Typography>
								</Button>
							</Grid>
						))}
					</Grid>
					{reportType === 'Other' ? ( // Caso a modalidade seja Outros, desbloqueia os passos seguintes
						<>
							<Grid container className={classes.paddingGrid}>
								<Grid item xs={true}>
									{' '}
									<Box>
										{' '}
										<TextField
											size='small'
											required
											multiline
											maxRows={4}
											variant='standard'
											fullWidth
											value={otherDescription}
											name='OtherDescription'
											placeholder='OBRIGATÓRIO: Descreve o teu problema, em pelo menos 30 caractéres'
											label=''
											onChange={handleOtherDescription}
											InputProps={{
												disableUnderline: true,
											}}
										/>
									</Box>
								</Grid>
							</Grid>
							<Grid
								container
								direction='row'
								justifyContent='flex-end'
								alignItems='flex-end'
								className={classes.paddingGrid}
							>
								<NormalButton
									fontSize={20}
									text='Submeter'
									variant='contained'
									onClick={handleSubmission}
								></NormalButton>
							</Grid>
						</>
					) : reportType !== null ? ( //O utilizador escolhe uma modalidade que não Outro, desbloqueia os passos seguintes
						<>
							<Grid container className={classes.paddingGrid}>
								<Grid item xs={true}>
									{' '}
									<Box>
										{' '}
										<TextField
											size='small'
											multiline
											maxRows={4}
											variant='standard'
											fullWidth
											value={otherDescription}
											name='OtherDescription'
											placeholder='OPCIONAL: Descreve o teu problema, em pelo menos 30 caractéres'
											label=''
											onChange={handleOtherDescription}
											InputProps={{
												disableUnderline: true,
											}}
										/>
									</Box>
								</Grid>
							</Grid>
							<Grid
								container
								direction='row'
								justifyContent='flex-end'
								alignItems='flex-end'
								className={classes.paddingGrid}
							>
								<NormalButton
									fontSize={20}
									text='Submeter'
									variant='contained'
									onClick={handleSubmission}
								></NormalButton>
							</Grid>
						</>
					) : null}
				</Grid>
			</DialogContent>
		</Dialog>
	);
}

ReportDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};
