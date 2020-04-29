import React ,{useState} from 'react';
// BootStrap imports
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// components and internal resources imports
import "./Home.css";
import Filters from './Filters.js';
import SubjectsInfo from './SubjectsInfo.js';
import UnqMap from '../resources/PlantaBajaUnq.png';
import MapModal from '../component/MapModal';

function Search() {

    const [subjects,setSubjects] = useState();

    return (
        <Container className="container">
            <Row className="main">
                <Col xs={3} className="justify-content-start" >
                    <Filters retrieveSubjects={(test) => setSubjects(test)} />
                </Col>
                <Col xs={5}>
                    <SubjectsInfo subjects={subjects} />
                </Col>
                <Col xs={4}>
                    <MapModal/>
                    {/* <img src={UnqMap} alt="mapa-unq"/> */}
                </Col>
            </Row>

        </Container>
    )
};

export default Search; 