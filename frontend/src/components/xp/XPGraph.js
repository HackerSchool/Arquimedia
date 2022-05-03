import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryScatter } from 'victory';

const XPGraph = (xpEvents) => {
	const addEmptyDays = (arr) => {
		const res = [];
		if (arr.length < 7) {
			let currentDate = new Date(arr[0].date);
			currentDate.setDate(currentDate.getDate() - 1);
			for (let i = 0; i < 7 - arr.length; i++) {
				res.unshift({
					date: currentDate.toDateString(),
					amount: 0,
				});
				currentDate.setDate(currentDate.getDate() - 1);
			}
		}

		for (let i = 0; i < arr.length; i++) {
			let clone = {};
			Object.assign(clone, arr[i]);
			res.push(clone);
			if (i === arr.length - 1 && new Date(arr[i].date).getDate() !== new Date().getDate()) {
				let currentDate = new Date(arr[i].date);
				while (currentDate.getDate() !== new Date().getDate()) {
					currentDate.setDate(currentDate.getDate() + 1);
					res.push({
						date: currentDate.toDateString(),
						amount: 0,
					});
				}
			} else if (i < arr.length - 1) {
				let currentDate = new Date(arr[i].date);
				let nextDate = new Date(arr[i + 1].date);
				if (currentDate.getDate() !== new Date(nextDate.getDate() - 1).getTime()) {
					currentDate.setDate(currentDate.getDate() + 1);

					while (currentDate.getDate() !== nextDate.getDate()) {
						res.push({
							date: currentDate.toDateString(),
							amount: 0,
						});
						currentDate.setDate(currentDate.getDate() + 1);
					}
				}
			}
		}
		return res;
	};

	const sumSimilar = (arr) => {
		const res = [];
		for (let i = 0; i < arr.length; i++) {
			const ind = res.findIndex((el) => el.date === arr[i].date);
			if (ind === -1) {
				res.push(arr[i]);
			} else {
				res[ind].amount += arr[i].amount;
			}
		}
		return res;
	};

	const cleanData = (data) => {
		let limit = Date.now() - 7; // limit is one week
		data = sumSimilar(data);
		data.splice(6, 0, {
			date: '2021-11-30',
			amount: 160,
		});
		data.splice(6, 0, {
			date: '2021-11-29',
			amount: 150,
		});
		data.splice(6, 0, {
			date: '2021-11-28',
			amount: 200,
		});
		data.splice(6, 0, {
			date: '2021-11-27',
			amount: 400,
		});
		data = addEmptyDays(data);
		data = data.filter((item) => new Date(item.date) < limit);
		return data;
	};

	const convertToWeekDays = (data) => {
		let weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
		for (let i = 0; i < data.length - 2; i++) {
			data[i].date = weekdays[new Date(data[i].date).getDay()];
		}
		data[data.length - 2].date = 'Ontem';
		data[data.length - 1].date = 'Hoje';
	};

	const getMaxXP = (data) => {
		let max = 100;
		for (let i = 0; i < data.length; i++) {
			if (data[i].amount > max) max = data[i].amount + 10;
		}

		return max;
	};

	let data = cleanData(xpEvents.xpEvents);
	data = data.slice(Math.max(data.length - 7, 0));
	convertToWeekDays(data);

	let maxAmount = getMaxXP(data);

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
