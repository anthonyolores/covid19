import axios from 'axios';
import moment from 'moment';
import {
	Country,
	DateRange,
	CaseStatus,
	CaseItem,
	CaseItemGlobal,
} from '../type';

const baseUrl = 'https://api.covid19api.com/';

export const fetchCountries = async (): Promise<Array<Country> | undefined> => {
	try {
		const result = (await axios.get(`${baseUrl}countries`)) as {
			data: Array<any>;
		};
		return result.data.map((d) => ({ Country: d.Country })) as Array<Country>;
	} catch {
		return undefined;
	}
};

const dateFormat = 'YYYY-MM-DD';

export const fetchCasesByCountry = async (
	country: string,
	status?: CaseStatus,
	dateRange?: DateRange
): Promise<Array<CaseItem> | undefined | null> => {
	try {
		const statusQuery = status ? 'status/' + status : '';
		const dateQuery = dateRange
			? 'from=' + dateRange.from + '&to' + dateRange.to
			: '';
		const currentDate = moment().format(dateFormat) + 'T00:00:00Z';
		const countryQuery =
			!country || country === 'Global'
				? ''
				: `country/${country}?from = ${currentDate} & to = ${currentDate}`;
		const result = (await axios.get(
			`${baseUrl + statusQuery + countryQuery + dateQuery}`
		)) as any;
		return result.data.map((caseItem: any) => {
			const { Confirmed, Deaths, Recovered, Active, Date, Country } = caseItem;
			return {
				Confirmed,
				Deaths,
				Recovered,
				Active,
				Date,
				Country,
			};
		}) as Array<CaseItem>;
	} catch {
		return undefined;
	}
};

export const fetchCasesWorld = async (): Promise<
	CaseItemGlobal | undefined
> => {
	try {
		const {
			NewConfirmed,
			TotalConfirmed,
			NewDeaths,
			TotalDeaths,
			NewRecovered,
			TotalRecovered,
		} = ((await axios.get(`${baseUrl}summary`)) as {
			data: {
				Global: any;
				Countries: any;
			};
		}).data.Global;
		console.log({
			NewConfirmed,
			TotalConfirmed,
			NewDeaths,
			TotalDeaths,
			NewRecovered,
			TotalRecovered,
		});
		return {
			NewConfirmed,
			TotalConfirmed,
			NewDeaths,
			TotalDeaths,
			NewRecovered,
			TotalRecovered,
		};
	} catch {
		return undefined;
	}
};
