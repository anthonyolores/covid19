import React from 'react';
import './App.scss';
import { Graph, CaseBox, SelectCountry } from './component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCountry, useCaseItem } from './hooks';
import { CaseItem } from './type';

function App() {
	const { country, setCountry } = useCountry();
	const { caseItems, setCaseItems } = useCaseItem();
	const handleSelecStatus = (caseItem: ReadonlyArray<CaseItem>) => {
		setCaseItems(caseItem);
	};
	return (
		<Container>
			<Row>
				<Col xs={12} md={12} lg={4}>
					<div className='header-title'>
						<span>COVID</span>
						<span>19</span>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={12} lg={4}>
					<SelectCountry onCountryChanged={setCountry} />
					<CaseBox
						country={country}
						onSelectStatus={handleSelecStatus}></CaseBox>
				</Col>
				<Col xs={12} md={12} lg={8}>
					{caseItems && <Graph caseItems={caseItems}></Graph>}
				</Col>
			</Row>
		</Container>
	);
}

export default App;
