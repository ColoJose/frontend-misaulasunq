import React from 'react';
import useState from 'react';
// BootStrap imports
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// components and internal resources imports
import "./Home.css";
import Filters from './Filters.js';
import SubjectsInfo from './SubjectsInfo.js';
import UnqMap from '../resources/plantaBajaUnq.png';

function Search() {

    // const [ imAtSearchPage, setImAtSearchPage ] = useState(false); whyyy????

    return (
        <Container className="container"> {/* refactorear: navbar*/ }

            <Row className="main">
                <Col xs={3} className="justify-content-start" >
                    <Filters />
                </Col>
                <Col xs={5}>
                    <SubjectsInfo />
                </Col>
                <Col xs={4}>
                    <img src={UnqMap} alt="mapa-unq"/>
                </Col>
            </Row>

        </Container>
    )
};

export default Search; 