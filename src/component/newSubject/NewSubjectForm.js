import React, { useState } from 'react';
import {Card, Container, Col, Row} from 'react-bootstrap';
import './NewSubjectForm.css';
import GeneralInfoForm from './GeneralInfoForm';
import CommissionForm from './CommissionForm';

export default function NewSubjectForm() {

    const subject = { };

    const [generalInfoSubject, setGeneralInfoSubject ] = useState(null);
    const [commissions, setCommissions] = useState([]);

    const addCommission = (commission) => {
        setCommissions([]);
        setCommissions([...commissions, commission])
        console.log(commissions);
    }

    const joinDataSubject = (generalInfoSubject) => {
        setGeneralInfoSubject(generalInfoSubject);
        subject.name = generalInfoSubject.name;
        subject.subjectCode = generalInfoSubject.subjectCode;
        subject.commissions = commissions;
        subject.degrees = generalInfoSubject.degrees
        console.log(subject);
    }

    return  (
        <Card className="wrapper">
            <Card.Header>Formulario nueva materia</Card.Header>
            <Card.Body>
                <Container fluid="md">
                    <Row>
                        <Col xs={6}>
                            <h3>Info general materia</h3>
                            <GeneralInfoForm 
                                commissions={commissions}
                                joinDataSubject={joinDataSubject}/>
                        </Col>
                        <Col xs={6}>
                            <h3>Comisiones</h3>
                            <CommissionForm
                                addCommission={addCommission} />
                        </Col>
                    </Row>
                </Container>    
            </Card.Body>
        </Card>
    )
}

