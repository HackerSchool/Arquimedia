import React from 'react';
import CheckboxMUI from '@mui/material/Checkbox';
import { ReactComponent as RedRoundCheckmark } from '../../assets/redroundcheck.svg';
import { ReactComponent as GreyRoundCheckbox } from '../../assets/redroundcheckbg.svg';

export const Checkbox = (props) => {
	return (
		<CheckboxMUI icon={<GreyRoundCheckbox />} checkedIcon={<RedRoundCheckmark />} {...props} />
	);
};
