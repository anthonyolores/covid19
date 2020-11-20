import React, { FunctionComponent, useEffect, useState } from 'react';
import { CaseItem, CaseItemGlobal } from '../../type';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchCasesByCountry, fetchCasesWorld } from '../../api';
import { FaCross } from 'react-icons/fa';
import { FaHeartbeat } from 'react-icons/fa';
import { FaCalculator } from 'react-icons/fa';
import { BsFillLightningFill } from 'react-icons/bs';
import './casebox.scss';

export type CaseBoxPros = {
	country: string;
	onSelectStatus: (caseItems: Array<CaseItem>) => void;
};

const getTotalCaseItem = (
	caseItems: Array<CaseItem> | undefined | null
): CaseItem | undefined => {
	if (!caseItems?.length) return undefined;

	const lastIndex = caseItems.length - 1;
	const caseItem: CaseItem = {
		Active: caseItems[lastIndex].Active,
		Confirmed: caseItems[lastIndex].Confirmed,
		Deaths: caseItems[lastIndex].Deaths,
		Recovered: caseItems[lastIndex].Recovered,
		Country: caseItems[lastIndex].Country,
		Date: caseItems[lastIndex].Date,
	};

	return caseItem;
};

const mapGlobalItemToCaseItem = (
	caseItemGlobal: CaseItemGlobal | undefined
): CaseItem | undefined => {
	if (!!!caseItemGlobal) return;
	return {
		Active: undefined,
		Confirmed: caseItemGlobal.TotalConfirmed,
		Deaths: caseItemGlobal.TotalDeaths,
		Recovered: caseItemGlobal.TotalRecovered,
		Country: 'Global',
		Date: '',
	};
};

const addComma = (value: number): string => {
	return new Intl.NumberFormat().format(value);
};

const CaseBox: FunctionComponent<CaseBoxPros> = (props: CaseBoxPros) => {
	const [caseItems, setCaseItems] = useState<
		Array<CaseItem> | undefined | null
	>(null);
	const [totalCaseItem, setTotalCaseItem] = useState<CaseItem | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async (country: string) => {
			setIsLoading(true);
			if (country !== 'Global') {
				const caseItems = await fetchCasesByCountry(country);
				setCaseItems(caseItems);
				props.onSelectStatus(caseItems || []);
			} else {
				const globalCaseItem = await fetchCasesWorld();
				setTotalCaseItem(mapGlobalItemToCaseItem(globalCaseItem));
			}
			setIsLoading(false);
		};
		fetchData(props.country);
	}, [props.country]);

	useEffect(() => {
		setTotalCaseItem(getTotalCaseItem(caseItems));
	}, [caseItems]);

	if ((caseItems === null && !!!totalCaseItem) || isLoading)
		return <div> Loading Cases... </div>;

	const transformCaseBox = (caseItem: CaseItem | undefined) => {
		return (
			(caseItem && (
				<div className='casebox'>
					<ListGroup.Item className='case-item'>
						<div className='status-title total'>
							<FaCalculator /> <span>Total Cases</span>
						</div>
						<div className='total'> {addComma(caseItem.Confirmed)} </div>
					</ListGroup.Item>
					{!!caseItem.Active && (
						<ListGroup.Item className='case-item'>
							<div className='status-title'>
								<BsFillLightningFill /> <span> Active </span>
							</div>
							<div className='active'> {addComma(caseItem.Active)} </div>
						</ListGroup.Item>
					)}
					<ListGroup.Item className='case-item'>
						<div className='status-title'>
							<FaHeartbeat /> <span> Recovered </span>
						</div>
						<div className='recovered'> {addComma(caseItem.Recovered)} </div>
					</ListGroup.Item>
					<ListGroup.Item className='case-item'>
						<div className='status-title'>
							<FaCross /> <span>Deaths </span>
						</div>
						<div className='deaths'> {addComma(caseItem.Deaths)} </div>
					</ListGroup.Item>
				</div>
			)) || (
				<ListGroup.Item
					style={{ backgroundColor: '#f8f8f8', border: 'none', color: '#888' }}>
					No record found
				</ListGroup.Item>
			)
		);
	};

	return transformCaseBox(totalCaseItem);
};

export default CaseBox;
