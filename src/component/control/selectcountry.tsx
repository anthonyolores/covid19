import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import { useCountries } from '../../hooks';

export type SelectCountryProps = {
	onCountryChanged: (country: string) => void;
};

const SelectCountry: FunctionComponent<SelectCountryProps> = (
	props: SelectCountryProps
) => {
	const countries = useCountries();

	const handleCountryChanged = (event: React.ChangeEvent<any>) => {
		props.onCountryChanged(event.target.value);
	};

	if (!countries) return <>Loading Countries</>;

	const options = [
		<option key={'Global'}>Global</option>,
		...countries
			.map((c) => c.Country)
			.sort()
			.map((c) => {
				return <option key={c}>{c}</option>;
			}),
	];

	return (
		<Form>
			<Form.Group controlId='exampleForm.SelectCustomSizeLg'>
				<Form.Control as='select' onChange={handleCountryChanged} custom>
					{options}
				</Form.Control>
			</Form.Group>
		</Form>
	);
};

export default SelectCountry;
