import React, { useEffect, useState } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryScatter } from 'victory';

const XPGraph = (props) => {
	const [data, setData] = useState();
	const [maxAmount, setMaxAmount] = useState();

	useEffect(() => {
		let new_data = cleanData(props.xpEvents);
		setData(new_data);

		setMaxAmount(getMaxXP(new_data) + 50);
	}, []);

	if (data === undefined) return <></>;

	return (
		<VictoryChart
			theme={VictoryTheme.material}
			maxDomain={{ y: maxAmount }}
			width={1000}
			animate={{
				duration: 2000,
				onLoad: { duration: 1000 },
			}}
		>
			<VictoryLine
				interpolation='catmullRom'
				style={{
					data: { stroke: '#EB5757' },
					parent: { border: '1px solid #ccc' },
				}}
				data={data}
				x={'date'}
				y={'amount'}
			/>
			<VictoryScatter
				data={data}
				x={'date'}
				y={'amount'}
				style={{
					data: { fill: '#EB5757' },
					parent: { border: '1px solid #ccc' },
				}}
				size={7}
				events={[
					{
						target: 'data',
						eventHandlers: {
							onMouseOver: () => {
								return [
									{
										target: 'data',
										mutation: (props) => {
											const fill = props.style && props.style.fill;
											return fill === 'grey'
												? null
												: { style: { fill: 'grey' } };
										},
									},
								];
							},
							onMouseOut: () => {
								return [
									{
										target: 'data',
										mutation: (props) => {
											const fill = props.style && props.style.fill;
											return fill === '#c43a31'
												? null
												: { style: { fill: '#c43a31' } };
										},
									},
								];
							},
						},
					},
				]}
			/>
		</VictoryChart>
	);
};

export default XPGraph;

const sumSimilar = (arr) => {
	let res = [];
	// Checks if a given datapoint is in the res array, if not it pushs the data point,
	// if it is, then the amount in summed
	arr.forEach((el) => {
		// Checks if element is in res
		const ind = res.findIndex((el2) => el2.date === el.date);

		// Push the element if not
		if (ind === -1) res.push(el);
		// Add the amount if it already is present
		else {
			res[ind].amount += el.amount;
		}
	});
	return res;
};

const convertToWeekDays = (e) => {
	let weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
	for (let i = 0; i < e.length - 2; i++) {
		e[i].date = weekdays[new Date(e[i].date).getDay()];
	}
	e[e.length - 2].date = 'Ontem';
	e[e.length - 1].date = 'Hoje';
};

const addEmptyDays = (arr) => {
	let res = [];
	let date = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
	// Reset time on comparing date so that time is ignored in comparison
	date.setHours(1, 0, 0, 0);
	for (let i = 0; i < 7; i++) {
		// check if we got data point for that day
		let index = arr.findIndex((el) => new Date(el.date).valueOf() === date.valueOf());

		if (index !== -1) res.push(arr[index]);
		else res.push({ date: date.toISOString(), amount: 0 });

		date.setDate(date.getDate() + 1);
	}
	return res;
};

const cleanData = (el) => {
	let limit = Date.now() - 7; // limit is one week
	el = sumSimilar(el);
	el = el.filter((item) => new Date(item.date) < limit);
	el = addEmptyDays(el);
	convertToWeekDays(el);
	return el;
};

const getMaxXP = (e) => {
	let max = 100;
	for (let i = 0; i < e.length; i++) {
		if (e[i].amount > max) max = e[i].amount + 10;
	}

	return max;
};
