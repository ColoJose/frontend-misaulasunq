import SubjectAPI from "../Api/SubjectAPI";
// React
import React, {useState} from 'react';
// Bootstrap
import { Card, Row, Col, Button, Form, FormGroup, Image } from 'react-bootstrap';
// Resources
import next from '../resources/next.png';
// CSS
import "./Filters.css"

const hours = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"]
const optionsHours = hours.map( (hs) => <option key={hs.toString()}>{hs}</option>)

const Filters = (props) => {

    const [subject, setSubject] = useState("");
    const [classroomNumber, setClassroomNumber] = useState("");
    const [startHour, setStartHour] = useState("07:00");
    const [endHour, setEndHour] = useState("22:00");

    const filterBySubject = (e) =>{
        e.preventDefault();
        const subjectApi = new SubjectAPI();
        subjectApi.getSubjectsByName(subject)
                .then( resp =>{
                    props.retrieveSubjects(resp.data);
                }).catch(e => {
                    console.log(e)
                })
    }
     
    const filterBySchedule = (e) => {
        e.preventDefault();
        const subjectApi = new SubjectAPI();
        subjectApi.getSubjectsBySchedule(startHour, endHour)
                .then( resp =>{
                    props.retrieveSubjects(resp.data);
                }).catch(e => {
                    console.log(e)
                })
    }

    const filterByNumberOf = (e) => {
        e.preventDefault();
        const subjectApi = new SubjectAPI();
        subjectApi.getSubjectsByClassroomNumber(classroomNumber)
                .then( resp =>{
                    props.retrieveSubjects(resp.data);
                }).catch(e => {
                    console.log(e)
                })
    }

    return (
        <>
            <Card>
                <Card.Header as="h5">Filtros</Card.Header>
                <Card.Body>
                    <Form>
                        <h6>Filtrar por nombre materia</h6>
                        <FormGroup>
                            <Row>
                                <Col xs={9}>
                                    <Form.Control type="text" 
                                                  value={subject}
                                                  placeholder="Ingrese nombre materia"
                                                  onChange={ (e) => setSubject(e.target.value)}/>
                                </Col>
                                <Col xs={3}>
                                    <Button variant="outline-light">
                                        <Image src={next} 
                                               onClick={ (e) => filterBySubject(e) }/>
                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form> 
                    <Form>
                        <h6>Filtrar por horario</h6>
                            <FormGroup> 
                            <Row>
                                <Col xs={4}>
                                    <Form.Control as="select"
                                                    value={startHour}
                                                    custom 
                                                    placeholder="Desde"
                                                    onChange={ (e) => setStartHour(e.target.value)}> 
                                        {optionsHours} 
                                    </Form.Control>
                                </Col>    
                                <Col xs={1}/>
                                <Col xs={4}>
                                    <Form.Control as="select" 
                                                    value={endHour}
                                                    custom 
                                                    placeholder="Hasta"
                                                    onChange={ (e) => setEndHour(e.target.value)}>>
                                        {optionsHours}
                                    </Form.Control>
                                </Col>
                                <Col xs={2}>
                                    <Button variant="outline-light">
                                        <Image src={next} 
                                                onClick={ (e) => filterBySchedule(e) }/>
                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>

                    <Form>
                        <h6>Filtrar por Nro de aula</h6>
                        <FormGroup>
                            <Row>
                                <Col xs={9}>
                                    <Form.Control type="text" 
                                                  placeholder="Ingrese número de aula"
                                                  onChange={ (e) => setClassroomNumber(e.target.value)}/>
                                </Col>
                                <Col xs={3}>
                                    <Button variant="outline-light">
                                        <Image src={next} 
                                               onClick={ (e) => filterByNumberOf(e) }/>
                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
};

export default Filters;