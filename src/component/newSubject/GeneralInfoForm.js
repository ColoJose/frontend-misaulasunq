import React, { useState } from 'react';
import { Form, ListGroup, Card, Button, Row, Col } from 'react-bootstrap';
import CommissionItem from './CommissionItem';
// css
import '../ButtonBranding.css';

export default function GeneralInfoForm({ degreeOptions, commissions, joinDataSubject, deleteCommission}) {

    const [name,setName] = useState('');
    const [degreeId, setDegreeId] = useState(1);
    const [subjectCode, setSubjectCode] = useState('');
  
    const generalInfo = {
        name,
        subjectCode,
        degreeId
    }
 
    const setDegreeAux = (event) =>{
        //const selectedIndex = e.target.options.selectedIndex; <- da el index de la opcion NO el
        // setDegreeId(selectedIndex);
        setDegreeId(parseInt(event.target.value));
    }

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
                            {degreeOptions}
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
                                        com => <CommissionItem key={com.name+com.semester+com.year}
                                                               commission={com}
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