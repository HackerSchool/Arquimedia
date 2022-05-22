import React, { useEffect, useState } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryScatter } from 'victory';

const XPGraph = (props) => {
	const addEmptyDays = (arr) => {
		const res = [];
		if (arr.length < 7) {
			let currentDate = new Date();
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

	const cleanData = (el) => {
		let limit = Date.now() - 7; // limit is one week
		el = sumSimilar(el);
		el = addEmptyDays(el);
		el = el.filter((item) => new Date(item.date) < limit);
		return el;
	};

	const convertToWeekDays = (e) => {
		let weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
		console.log(e);
		for (let i = 0; i < e.length - 2; i++) {
			e[i].date = weekdays[new Date(e[i].date).getDay()];
		}
		e[e.length - 2].date = 'Ontem';
		e[e.length - 1].date = 'Hoje';
	};

	const getMaxXP = (e) => {
		let max = 100;
		for (let i = 0; i < e.length; i++) {
			if (e[i].amount > max) max = e[i].amount + 10;
		}

		return max;
	};

	const [data, setData] = useState();
	const [maxAmount, setMaxAmount] = useState();

	useEffect(() => {
		let new_data = cleanData(props.xpEvents);
		new_data = new_data.slice(Math.max(new_data.length - 7, 0));
		convertToWeekDays(new_data);
		setData(new_data);

		setMaxAmount(getMaxXP(new_data));
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
