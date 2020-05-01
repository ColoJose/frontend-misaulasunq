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
                   fluid
                   style={{marginLeft:"1%", marginRight:"1%",maxWidth: "98%"}}>
            <Row className="main">
                <Col className="justify-content-start"
                     style={{paddingRight:"4%"}}
                     xs={4}>
                    <Filters retrieveSubjects={setSubjects} />
                </Col>
                <Col className="justify-content-center"
                     style={{paddingRight:"8%"}}
                     xs={8}>
                    <SubjectsInfo subjects={subjects} />
                </Col>
            </Row>
        </Container>
    )
};

export default Search; 