import React ,{useState} from 'react';
// BootStrap imports
import { Container, Col, Row } from 'react-bootstrap';
// components and internal resources imports
import "./Home.css";
import Filters from './Filters.js';
import SubjectsInfo from './subject information/SubjectsInfo.js';

function Search() {

    const [subjects,setSubjects] = useState();

    return (
        <Container className="container" style={{marginLeft:"1%"}}>
            <Row className="main">
                <Col xs={3} className="justify-content-start" >
                    <Filters retrieveSubjects={setSubjects} />
                </Col>
                <Col xs={5}>
                    <SubjectsInfo subjects={subjects} />
                </Col>
                <Col xs={4}>
                    {/* <MapModal/> */}
                    {/* <img src={UnqMap} alt="mapa-unq"/> */}
                </Col>
            </Row>

        </Container>
    )
};

export default Search; 