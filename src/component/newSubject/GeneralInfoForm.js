import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Card, Button, Row, Col } from 'react-bootstrap';
import CommissionItem from './CommissionItem';
import SubjectAPI from '../../Api/SubjectAPI.js';
// css
import '../ButtonBranding.css';

export default function GeneralInfoForm({commissions, joinDataSubject, deleteCommission}) {

    const subjectAPI = new SubjectAPI();

    const [allDegrees,setAllDegrees] = useState([]);
    const [name,setName] = useState('');
    const [degreeId, setDegreeId] = useState(1);
    const [subjectCode, setSubjectCode] = useState('');
  
    const generalInfo = {
        name,
        subjectCode,
        degreeId
    }
 
    useEffect( () => {
        subjectAPI.getAllDegrees()
                .then( (resp) => {
                    setAllDegrees(resp.data);
            })
.       catch( (e) => {console.log(e);});
    },[]);

    const setDegreeAux = (e) =>{
        const selectedIndex = e.target.options.selectedIndex;
        setDegreeId(selectedIndex);
    }

    const degreesOptions = allDegrees.map( 
        (degree) => { 
            return <option key={degree.id.toString()}>{degree.name}</option> 
        }    
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        joinDataSubject(generalInfo);
    }

    return (
        <>
            <form id="general-info"
                  className="col-11"
                  data-toggle="validator"
                  onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group className="col-12">
                        <Form.Label>Nombre materia</Form.Label>
                        <Form.Control value={name}
                                    onChange={ (e) => setName(e.target.value)}
                                    required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="col-12">
                        <Form.Label>Carrera a la que pertenece</Form.Label>
                        <Form.Control as="select"
                                        onChange={ (e) => setDegreeAux(e)}
                                        required>
                            {degreesOptions}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="col-12">
                        <Form.Label>Código materia</Form.Label>
                        <Form.Control id="subjectCodeNewForm"                      
                                    value={subjectCode}
                                    onChange={ (e) => setSubjectCode(e.target.value)}
                                    required
                                    maxLength="10" />
                    </Form.Group>
                </Form.Row>
                </form>
                <Col xs={11}>
                    <hr/>
                    <Card id="addedCommissionsSection">
                        <Card.Header>
                            <Row className="d-flex align-items-center">
                                <Col xs={12} className="font-weight-bolder">
                                    Comisiones agregadas
                                </Col>
                            </Row>
                        </Card.Header>
                        <ListGroup>
                            { 
                                commissions.length === 0 ? 
                                    <ListGroup.Item className="text-muted">
                                        No ha agregado comisiones aún.
                                    </ListGroup.Item>
                                :
                                    commissions.map( 
                                        com => <CommissionItem commission={com}
                                                            deleteCommission={deleteCommission}/>
                                    )
                            }
                        </ListGroup>
                    </Card>
                </Col>
                <Form.Group className="mt-3 d-flex justify-content-center">
                    <Button className="btn btn-danger color-button"
                        form="general-info" 
                            type="submit">
                        Cargar Materia
                    </Button>
                </Form.Group>
        </>
    );
}