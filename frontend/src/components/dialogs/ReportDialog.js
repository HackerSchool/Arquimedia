import * as React from 'react';
import PropTypes from 'prop-types';
import {
	DialogTitle,
	Dialog,
	IconButton,
	DialogContent,
	Grid,
	Typography,
	Button,
} from '@mui/material';
import theme from '../../globalTheme';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as TextBubbleIcon } from '../../assets/textBubbleIcon.svg';
import { ReactComponent as SubmissionIcon } from '../../assets/textBubbleIcon.svg';
import { ReactComponent as DesformatIcon } from '../../assets/textBubbleIcon.svg';
import { ReactComponent as LoadingIcon } from '../../assets/textBubbleIcon.svg';
import { ReactComponent as ImageIcon } from '../../assets/textBubbleIcon.svg';
import { ReactComponent as OtherIcon } from '../../assets/textBubbleIcon.svg';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveWidth from '../../hooks/responsiveWidth';

const reportData = [
	{
		icon: <TextBubbleIcon />,
		text: 'Erro no enunciado ou opções de resposta',
		type: 'textError',
	},
	{ icon: <SubmissionIcon />, text: 'Erro na submissão', type: 'submission' },
	{ icon: <DesformatIcon />, text: 'Pergunta desformatada', type: 'formatting' },
	{ icon: <LoadingIcon />, text: 'A página não carrega', type: 'loading' },
	{ icon: <ImageIcon />, text: 'Figura errada ou em falta', type: 'image' },
	{ icon: <OtherIcon />, text: 'Outro...', type: 'other' },
];

const useStyles = makeStyles(() => ({
	reportText: {
		wordWrap: 'break-word',
		fontWeight: 'bold',
		flexWrap: 'nowrap',
		textTransform: 'none',
	},
}));

export default function ReportDialog(props) {
	const classes = useStyles();
	const handleClose = () => {
		props.onClose(props.reportType);
	};

	// const handleListItemClick = (value) => {
	// 	props.onClose(value);
	// };

	const windowArray = useWindowDimensions();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Dialog onClose={handleClose} open={props.open} fullScreen={fullScreen} maxWidth={'lg'}>
			<DialogTitle>
				<Typography
					variant='h5'
					fontWeight='bold'
					color={theme.palette.secondary.main}
					style={{
						fontSize: responsiveWidth(windowArray, 15, 35, 0.017),
					}}
				>
					Set backup account
				</Typography>
				{props.onClose ? (
					<IconButton
						aria-label='close'
						onClick={props.onClose}
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
				<Grid container direction='row' justifyContent='center' spacing={2}>
					{reportData.map((reportType) => (
						<Grid
							item
							container
							xs={4}
							justifyContent='flex-start'
							alignItems='center'
							key={reportType.type}
						>
							<Button startIcon={reportType.icon} color='inherit'>
								<Typography
									variant='body1'
									className={classes.reportText}
									display='block'
								>
									{reportType.text}
								</Typography>
							</Button>
						</Grid>
					))}
				</Grid>
			</DialogContent>
		</Dialog>
	);
}

ReportDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	reportType: PropTypes.string.isRequired,
};
