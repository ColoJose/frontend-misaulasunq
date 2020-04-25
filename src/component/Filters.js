import "./Filters.css"
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import next from '../resources/next.png';
import { Row, Col,Button } from "react-bootstrap";
import axios from 'axios';

const hours = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
const optionsHours = hours.map( (hs) => <option key={hs.toString()}>{hs}</option>)

const Filters = (props) => {

    const [subject, setSubject] = useState("");

    const filterBySubject = (e) =>{
        e.preventDefault();
        async function test(){
            const response = await axios({
                url: `http://localhost:8090/subjectAPI/byName/${subject}`,
                method: 'GET'
            }).then( resp =>{
                props.retrieveSubjects(resp.data);
            }).catch(e => {
                console.log(e)
            })
        }
        test();
        return false;
    }
     
    const filterBySchedule = () => {
        console.log("filter by schedule works");
    }

    const filterByNumberOf = () => {
        console.log("filter by n");
    }

    return (
        <div>
                <Form >
                    <h5>Filtrar por nombre materia</h5>
                    <FormGroup onSubmit={filterBySubject}>
                        <Row>
                            <Col xs={6}>
                                <Form.Control type="text" 
                                              value={subject}
                                              placeholder="Ingrese nombre materia"
                                              onChange={ (e) => setSubject(e.target.value)}              
                                />
                            </Col>
                            <Col xs={6}>
                                <Button onClick={ (e) => filterBySubject(e) } type="image" src={next}/>
                            </Col>
                        </Row>
                    </FormGroup>
                    
                </Form> 
                <Form>
                    <h5>Filtrar por horario</h5>
                    
                        <FormGroup> {/* TODO: validaciones que no den conjunto vacío */}
                        <Row>
                            <Col xs={4}>
                                <Form.Control as="select" custom placeholder="Desde"> 
                                    {/* TODO hacer que se vea el value="Desde* idem Hasta*/}
                                    {optionsHours} 
                                </Form.Control>
                            </Col>    

                            <Col xs={4}>
                                <Form.Control as="select" custom placeholder="Hasta">
                                    {optionsHours}
                                </Form.Control>
                            </Col>

                            <Col xs={4}>
                                <input type="image" src={next}/>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>

                <Form>
                    <h5>Filtrar por Nro de aula</h5>
                    <FormGroup>
                        <Row>
                            <Col xs={6}>
                                <Form.Control type="text" placeholder="Ingrese número de aula"/>
                            </Col>
                            <Col xs={6}>
                                <input  type="image" src={next}/>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>

   
                
        </div>
    )
};

export default Filters;