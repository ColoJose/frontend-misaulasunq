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
        <Container className="container" 
                   style={{marginLeft:"1%"}}>
            <div className="bgImage"/>
            <Row className="main">
                <Col className="justify-content-start"
                     xs={3.5}>
                    <Filters retrieveSubjects={setSubjects} />
                </Col>
                <Col xs={8.5}>
                    <SubjectsInfo subjects={subjects} />
                </Col>
            </Row>
        </Container>
    )
};

export default Search; 