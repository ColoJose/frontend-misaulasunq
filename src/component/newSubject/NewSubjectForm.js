import React from 'react';
import {Card, Container, Col, Row} from 'react-bootstrap';
import './NewSubjectForm.css';
import GeneralInfoForm from './GeneralInfoForm';
import CommissionForm from './CommissionForm';

export default function NewSubjectForm() {

    return  (
        <Card className="wrapper">
            <Card.Header>Formulario nueva materia</Card.Header>
            <Card.Body>
                <Container fluid="md">
                    <Row>
                        <Col xs={6}>
                            <GeneralInfoForm />
                        </Col>
                        <Col xs={6}>
                            <CommissionForm />
                        </Col>
                    </Row>
                </Container>    
            </Card.Body>
        </Card>
    )
}

