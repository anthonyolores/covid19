import { useState, useEffect } from 'react';
import { Country, CaseItem, CaseItemGlobal } from './type';
import { fetchCountries } from './api';

export const useCountries = (): Array<Country> | undefined => {
	const [countries, setCountries] = useState<Array<Country> | undefined>(
		undefined
	);
	useEffect(() => {
		const fetchCountriesFn = async () => setCountries(await fetchCountries());
		fetchCountriesFn();
	}, []);

	return countries;
};

export const useCountry = () => {
	const [country, setCountry] = useState<string>('Global');
	return {
		country,
		setCountry,
	};
};

export const useCaseItem = () => {
	const [caseItems, setCaseItems] = useState<ReadonlyArray<CaseItem>>();
	return {
		caseItems,
		setCaseItems,
	};
};

export const useCaseItemGlobal = () => {
	const [caseItemGlobal, setCaseItemGlobal] = useState<CaseItemGlobal>();
	return {
		caseItemGlobal,
		setCaseItemGlobal,
	};
};
