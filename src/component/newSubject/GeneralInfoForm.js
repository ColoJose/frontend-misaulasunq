import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Card, Button } from 'react-bootstrap';
import CommissionItem from './CommissionItem';

import SubjectAPI from '../../Api/SubjectAPI.js';

export default function GeneralInfoForm({commissions, joinDataSubject}) {

    const [allDegrees,setAllDegrees] = useState([])
    const [name,setName] = useState('');
    const [degreeId, setDegreeId] = useState(0);
    const [subjectCode, setSubjectCode] = useState('');
  
    const generalInfo = {
        name:name,
        subjectCode: subjectCode,
        degreeId: degreeId
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        joinDataSubject(generalInfo);
    }
 
    useEffect( async() => {
        const degrees = await subjectAPI.getAllDegrees()
        setAllDegrees(degrees.data);
    },[]);

    const setDegreeAux = (e) =>{
        const selectedIndex = e.target.options.selectedIndex;
        setDegreeId(selectedIndex);
    }

    const degreesOptions = allDegrees.map( d => { return <option key={d.id.toString()}>{d.name}</option> })  
    const subjectAPI = new SubjectAPI();

    return (
        <>
            <form data-toggle="validator" role="form" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Carrera a la que pertenece</Form.Label>
                    <Form.Control as="select"
                                    //  value={degreeId}
                                     onChange={ (e) => setDegreeAux(e)}
                                     required>
                                      {degreesOptions}
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