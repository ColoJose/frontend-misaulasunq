import React, { useState } from 'react';
import { Form, ListGroup, Card, Button } from 'react-bootstrap';
import CommissionItem from './CommissionItem';

import SubjectAPI from '../../Api/SubjectAPI.js';

export default function GeneralInfoForm({commissions, joinDataSubject}) {

    const [name,setName] = useState('');
    const [degrees, setDegrees] = useState([]);
    const [subjectCode, setSubjectCode] = useState('');
  
    const generalInfo = {
        name:name,
        subjectCode: subjectCode,
        degrees: degrees
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        joinDataSubject(generalInfo);
    }
 
    return (
        <>
            <form data-toggle="validator" role="form" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Carrera a la que pertenece</Form.Label>
                    <Form.Control as="select"
                                  value={degrees}
                                  onChange={ (e) => setDegrees(e.target.value)}
                                  required>
                                    <option>tpi</option>
                                    <option>biotecnologia</option>
                                    <option>terapia ocupacional</option>
                                    {/* TODO: que devuelva todas las carreras con un get de la api */}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                        <Form.Label>Nombre materia</Form.Label>
                        <Form.Control 
                                value={name}
                                onChange={ (e) => setName(e.target.value)}
                                required/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Código materia</Form.Label>
                    <Form.Control                     
                        value={subjectCode}
                        onChange={ (e) => setSubjectCode(e.target.value)}
                        required/>
                </Form.Group>

                <Card>
                    <Card.Header>Comisiones agregadas</Card.Header>
                    <ListGroup>
                        { commissions.length === 0 ? <ListGroup.Item>No ha agregado comisiones aún</ListGroup.Item>
                                                   :
                                              commissions.map( com => <CommissionItem commission={com}/>)
                        }
                         
                    </ListGroup>
                </Card>
                <Form.Group>
                    <Button className="btn btn-danger" type="submit">Agregar materia</Button>
                </Form.Group>
            </form>
        </>
    )
}