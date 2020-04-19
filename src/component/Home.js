import React from 'react';
// BootStrap imports
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// components and internal resources imports
import "./Home.css";
import Filters from './Filters.js';
import SubjectsInfo from './SubjectsInfo.js';
import UnqMap from '../resources/plantaBajaUnq.png';
import NavbarApp from './Navbar.js';

function Home() {

    return (

        <Container className="container"> {/* refactorear: navbar*/ }
            <NavbarApp />
            {/* Body */}
            <Row className="main">
                <Col xs={3} 
                    className="justify-content-start" >
                    
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
}

export default Home;