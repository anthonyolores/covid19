import React, { FunctionComponent } from 'react';
import { CaseItem, CaseItemGlobal } from '../../type';
import { HorizontalBar, Line } from 'react-chartjs-2';
import './graph.scss';

type GraphProps = {
	caseItems?: ReadonlyArray<CaseItem>;
	caseItemGlobal?: CaseItemGlobal
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

const caseItemToBarData = (caseItem: CaseItemGlobal) => {
	return {
		labels: [
			'Total Confirmed', 'Total Recovered', 'Total Deaths'
		],
		datasets: [
			{
				label: 'Total',
				data: [caseItem.TotalConfirmed, caseItem.TotalRecovered, caseItem.TotalDeaths],
				backgroundColor: ['#54ff57','#1da1ff','#ff6854']
			},
		],
	};
};

const options = {
	legend: {
		display: false
	 },
  }

const Graph: FunctionComponent<GraphProps> = ({caseItems, caseItemGlobal }: GraphProps) => {

	if (caseItems && caseItems.length > 1)
	return (
		<div className='graph-container'>
			<Line data={caseItemToLineData(caseItems)} />
		</div>
			);	

	if(caseItemGlobal)
	return (
		<div className='graph-container'>
			<HorizontalBar data={caseItemToBarData(caseItemGlobal)} options={options}/>
		</div>
			);
	
	return null;
};

export default Graph;
