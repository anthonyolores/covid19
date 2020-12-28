export type Country = {
    Country: string;
};  

export type CaseStatus = 'Confirmed' | 'Deaths' | 'Recovered' | 'Active' | 'All'; 

export type CaseItem = Country & {
    Confirmed: number;
    Deaths: number;
    Recovered: number;
    Active: number | undefined;
    Date: string;
};

export type CaseItemGlobal = {
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number
}


export type DateRange = { from: string, to: string };