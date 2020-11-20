import React, { FunctionComponent } from 'react';
import { CaseItem } from '../../type';
import { Line } from 'react-chartjs-2';
import './graph.scss';

type GraphProp = {
	caseItems: ReadonlyArray<CaseItem>;
};

const caseItemToLineData = (caseItems: ReadonlyArray<CaseItem>) => {
	return {
		labels: [
			...caseItems.map((ci) => {
				const date = new Date(ci.Date);
				return date.getMonth() + 1 + '/' + date.getDate();
			}),
		],
		datasets: [
			{
				label: 'Total',
				backgroundColor: '#eee',
				data: [...caseItems.map((ci) => ci.Confirmed)],
			},
			{
				label: 'Active',
				backgroundColor: '#54ff57',
				data: [...caseItems.map((ci) => ci.Active)],
			},
			{
				label: 'Recovered',
				backgroundColor: '#1da1ff',
				data: [...caseItems.map((ci) => ci.Recovered)],
			},
			{
				label: 'Death',
				backgroundColor: '#ff6854',
				data: [...caseItems.map((ci) => ci.Deaths)],
			},
		],
	};
};

const Graph: FunctionComponent<GraphProp> = (props: GraphProp) => {
	if (!!!props.caseItems.length) return null;
	return (
		<div className='graph-container'>
			<Line data={caseItemToLineData(props.caseItems)} />
		</div>
	);
};

export default Graph;
