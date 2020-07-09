import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Card, Button} from 'react-bootstrap';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        joinDataSubject(generalInfo);
    }
 
    useEffect( () => {
        subjectAPI.getAllDegrees()
                .then( (resp) => {
                    setAllDegrees(resp.data);
            })
.       catch( (e) => {console.log(e);});
    },[]);
    // Este seteo con el async y return rompe en el unmount!
    // useEffect( async() => {
    //     const degrees = await subjectAPI.getAllDegrees();
    //     setAllDegrees(degrees.data);
    // },[]);

    const setDegreeAux = (e) =>{
        const selectedIndex = e.target.options.selectedIndex;
        setDegreeId(selectedIndex);
    }

    const degreesOptions = allDegrees.map( (d) => { return <option key={d.id.toString()}>{d.name}</option> });  

    return (
        <div>
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
                        id="subjectCodeNewForm"                      
                        value={subjectCode}
                        onChange={ (e) => setSubjectCode(e.target.value)}
                        required
                        maxLength="10" />
                </Form.Group>

                <Card id="addedCommissionsSection">
                    <Card.Header>Comisiones agregadas</Card.Header>
                    <ListGroup>
                        { commissions.length === 0 ? <ListGroup.Item>No ha agregado comisiones aún</ListGroup.Item>
                                                   :
                                              commissions.map( 
                                                    com => <CommissionItem commission={com}
                                                                           deleteCommission={deleteCommission}
                                                           />
                                              )
                        }
                         
                    </ListGroup>
                </Card>
                <Form.Group>
                    <Button className="btn btn-danger color-button" 
                            type="submit"
                            style={{marginTop: "7px"}}>Agregar materia
                    </Button>
                </Form.Group>
            </form>
        </div>
    );
}